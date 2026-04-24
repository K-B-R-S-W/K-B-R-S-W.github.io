from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pypdf import PdfReader  
from docx import Document
from pydantic import BaseModel
import os
import re
import uuid
import httpx

load_dotenv()

NAMESPACE = os.getenv('NAMESPACE')
PROJECT_NAME = os.getenv('PROJECT_NAME')
VERSION = os.getenv('VERSION')

app = FastAPI()
prefix_router = APIRouter(prefix=NAMESPACE+PROJECT_NAME+VERSION)

origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://portfolio-chat-ui.vercel.app",
    "https://k-b-r-s-w.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request
from fastapi.responses import JSONResponse

@app.options("/{rest_of_path:path}")
async def preflight_handler(request: Request, rest_of_path: str):
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "https://k-b-r-s-w.github.io",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )

sessions: dict = {}

def get_session(session_id: str) -> dict:
    if session_id not in sessions:
        sessions[session_id] = {
            "visitor_name": None,
            "history": [],
            "background_info": ""
        }
    return sessions[session_id]

DOCS_BASE = os.getenv('DOCS_BASE')
BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR / DOCS_BASE

def read_files_from_dir(directory: Path) -> tuple[list[str], list[str]]:
    all_content = []
    files_found = []
    for file_path in directory.iterdir():
        if not file_path.is_file():
            continue
        try:
            if file_path.suffix.lower() == '.docx':
                doc = Document(str(file_path))
                content = "\n".join([para.text for para in doc.paragraphs])
            elif file_path.suffix.lower() == '.txt':
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            elif file_path.suffix.lower() == '.pdf':
                reader = PdfReader(str(file_path))
                content = "\n".join(
                    page.extract_text() for page in reader.pages
                    if page.extract_text().strip()
                )
            else:
                continue
            all_content.append(f"=== {file_path.name} ===\n{content}")
            files_found.append(file_path.name)
        except Exception as e:
            print(f"Error reading {file_path.name}: {str(e)}")
            continue
    return all_content, files_found

async def read_background_documents():
    try:
        shareable_dir = DOCS_DIR / "shareable"
        confidential_dir = DOCS_DIR / "confidential"
        for folder in [shareable_dir, confidential_dir]:
            if not folder.exists():
                folder.mkdir(parents=True, exist_ok=True)
        if not any(shareable_dir.iterdir()):
            return {"message": "Shareable directory is empty.", "content": "", "files_found": []}
        all_content, files_found = read_files_from_dir(shareable_dir)
        combined_content = "\n\n".join(all_content)
        return {"message": "Background documents read successfully", "content": combined_content, "files_found": files_found, "total_characters": len(combined_content)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read background documents: {str(e)}")

GROQ_URL = os.getenv('GROQ_URL', 'https://api.groq.com/openai/v1/chat/completions')
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_MODEL = os.getenv('GROQ_MODEL', 'llama-3.1-8b-instant')

def build_system_prompt(visitor_name: str | None, background_info: str = "") -> str:
    background_context = ""
    if background_info:
        background_context = f"""
Here's some background about me that you can draw from naturally in conversation:
{background_info}
Only bring up details when they're relevant - don't dump everything at once.
"""
    visitor_label = visitor_name if visitor_name else "the visitor"

    return f"""You are a digital version of me, Ravindu Sankalpa - chatting on my behalf with {visitor_label}.

Your job is to have a natural, friendly conversation that feels like it's genuinely coming from me.
Think of it like texting a mate, not writing a formal reply.

{background_context}

A few things to keep in mind:
- Always say something in response to the visitor's message, even if it's just a casual acknowledgment. Never leave them hanging.
- Talk in first person - "I", "me", "my" - like you're actually me
- Identity rule: when introducing yourself, always say exactly "I'm Ravindu Sankalpa."
- Do not introduce yourself as "Raviya". If needed, mention it only as a nickname: "Some friends call me Raviya."
- Avoid repeating name/identity statements in the same reply
- Keep the tone casual and warm, like catching up with someone you know
- Keep answers concise and clear (usually 3-7 lines)
- For multi-item answers, use short numbered or bullet points with line breaks
- Prefer professional, readable formatting over one long paragraph
- If you're not sure about something, say so in a relaxed way like "hmm, not too sure about that one tbh"
- Never reveal private details like my full address or phone number
- Match the vibe and length of what {visitor_label} said - avoid overly long replies
- You remember everything said earlier in this conversation, refer back to it naturally when relevant
- If the visitor tells you their name at any point, use it naturally going forward"""


def extract_name_from_message(message: str) -> str | None:
    message_lower = message.lower().strip()
    false_positives = {"fine", "good", "okay", "ok", "yes", "no", "sure", "great", "hey", "hi", "hello", "nothing", "nevermind"}
    patterns = [
        r"(?:i'?m|i am)\s+([a-z]+)",
        r"(?:my name is|my name's)\s+([a-z]+)",
        r"(?:call me|you can call me)\s+([a-z]+)",
        r"(?:it'?s|its)\s+([a-z]+)",
        r"^([a-z]+)$",
    ]
    for pattern in patterns:
        match = re.search(pattern, message_lower)
        if match:
            name = match.group(1).capitalize()
            if name.lower() not in false_positives:
                return name
    return None


class StartSession(BaseModel):
    useBackgroundInfo: bool = True

class ChatMessage(BaseModel):
    session_id: str
    message: str


@prefix_router.post("/session/start")
async def start_session(payload: StartSession):
    session_id = str(uuid.uuid4())
    session = get_session(session_id)
    background_info = ""
    if payload.useBackgroundInfo:
        try:
            bg_response = await read_background_documents()
            background_info = bg_response.get("content", "")
        except Exception as e:
            print(f"Warning: Could not load background info: {str(e)}")
    session["background_info"] = background_info
    system_prompt = build_system_prompt(None, background_info)
    greeting = await call_llm_groq(
        system_prompt=system_prompt,
        history=[],
        user_message=(
            "A visitor has just opened the chat for the first time. "
            "Greet them warmly and casually as Ravindu would, and ask for their name so you know what to call them. "
            "Keep it short and friendly - one or two sentences max."
        )
    )
    session["history"].append({"role": "assistant", "content": greeting})
    return {"session_id": session_id, "greeting": greeting}


@prefix_router.post("/session/update")
async def generate_answers(payload: ChatMessage):
    session = get_session(payload.session_id)
    if session["visitor_name"] is None:
        detected_name = extract_name_from_message(payload.message)
        if detected_name:
            session["visitor_name"] = detected_name
    session["history"].append({"role": "user", "content": payload.message})
    system_prompt = build_system_prompt(visitor_name=session["visitor_name"], background_info=session["background_info"])
    response = await call_llm_groq(
        system_prompt=system_prompt,
        history=session["history"][:-1],
        user_message=payload.message
    )
    session["history"].append({"role": "assistant", "content": response})
    return {"reply": response, "visitor_name": session["visitor_name"], "session_id": payload.session_id}


@prefix_router.delete("/session/{session_id}")
async def end_session(session_id: str):
    if session_id in sessions:
        del sessions[session_id]
        return {"message": "Session ended and memory cleared"}
    raise HTTPException(status_code=404, detail="Session not found")


async def call_llm_groq(system_prompt: str, history: list, user_message: str) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history)
    messages.append({"role": "user", "content": user_message})
    payload = {
        "model": GROQ_MODEL,
        "messages": messages,
        "stream": False,
        "max_tokens": 700,
        "temperature": 0.7
    }
    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.post(GROQ_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

app.include_router(prefix_router)
