export const SKILL_MAP = [

    // ── CENTER ────────────────────────────────────────────────────────────
    {
        nodeId: 'center',
        card: { type: 'intro', title: 'Ravindu Sankalpa', subtitle: 'AI & Data Science Engineer — building intelligent systems' },
        keywords: ['ravindu', 'who are you', 'about you', 'introduce yourself', 'tell me about', 'who is this'],
    },

    // ── IDENTITY ──────────────────────────────────────────────────────────
    {
        nodeId: 'origin',
        card: null,
        keywords: ['sri lanka', 'sri lankan', 'born in', 'roots', 'grew up', 'home country', 'where are you from', 'maharagama'],
    },
    {
        nodeId: 'location',
        card: null,
        keywords: ['maharagama', 'western province', 'where do you live', 'based in', 'currently in', 'living in'],
    },
    {
        nodeId: 'education',
        card: { type: 'edu_bsc', title: 'BSc Data Science — SLTC', subtitle: 'BSc (Hons) in Data Science from SLTC Research University' },
        keywords: ['sltc', 'data science degree', 'bachelor', 'undergraduate', 'bsc', 'university', 'research university'],
    },
    {
        nodeId: 'drive',
        card: null,
        keywords: ['motivation', 'drive', 'passion', 'why do you', 'what drives', 'curious', 'obsessed', 'love about'],
    },
    {
        nodeId: 'mindset',
        card: null,
        keywords: ['adaptable', 'motivated', 'collaborative', 'open source', 'contribute', 'mindset', 'attitude', 'innovative'],
    },

    // ── TECH STACK ────────────────────────────────────────────────────────
    {
        nodeId: 'languages',
        card: null,
        keywords: ['python', 'java', 'javascript', 'c++', 'r language', 'php', 'html', 'css', 'programming language', 'languages', 'code in', 'powershell'],
    },
    {
        nodeId: 'ai-ml',
        card: null,
        keywords: ['tensorflow', 'pytorch', 'keras', 'scikit', 'machine learning', 'deep learning', 'neural network', 'ai framework', 'ml framework'],
    },
    {
        nodeId: 'computer-vision',
        card: null,
        keywords: ['opencv', 'yolo', 'mediapipe', 'hrnet', 'computer vision', 'image processing', 'object detection', 'landmark detection', 'visual'],
    },
    {
        nodeId: 'data-tools',
        card: null,
        keywords: ['numpy', 'pandas', 'matplotlib', 'seaborn', 'power bi', 'snowflake', 'mlflow', 'data analysis', 'visualization', 'analytics'],
    },
    {
        nodeId: 'backend',
        card: null,
        keywords: ['flask', 'fastapi', 'nodejs', 'node.js', 'backend', 'api', 'server', 'rest api', 'web framework'],
    },
    {
        nodeId: 'databases',
        card: null,
        keywords: ['mysql', 'mongodb', 'firebase', 'database', 'firestore', 'sql', 'nosql'],
    },
    {
        nodeId: 'devops',
        card: null,
        keywords: ['docker', 'git', 'github', 'github actions', 'postman', 'anaconda', 'jupyter', 'devops', 'deployment', 'ci cd'],
    },
    {
        nodeId: 'iot',
        card: null,
        keywords: ['esp32', 'arduino', 'iot', 'embedded', 'hardware', 'microcontroller', 'sensor', 'raspberry'],
    },
    {
        nodeId: 'nlp',
        card: { type: 'skill_nlp', title: 'NLP & LLM Applications', subtitle: 'Prompting, retrieval workflows and conversational AI design' },
        keywords: ['nlp', 'natural language', 'prompt engineering', 'llm app', 'conversation ai', 'retrieval', 'rag', 'chatbot design'],
    },
    {
        nodeId: 'mlops',
        card: { type: 'skill_mlops', title: 'MLOps & Model Serving', subtitle: 'MLflow experiments, model versioning, deployment workflows' },
        keywords: ['mlops', 'mlflow', 'model serving', 'model registry', 'experiment tracking', 'pipeline', 'model deployment'],
    },
    {
        nodeId: 'cloud',
        card: { type: 'skill_cloud', title: 'Cloud & Deployment', subtitle: 'Vercel, API hosting, CI/CD and production deployment practices' },
        keywords: ['vercel', 'cloud', 'deployment', 'ci/cd', 'cicd', 'hosting', 'production', 'devops deployment'],
    },

    // ── PROJECTS ──────────────────────────────────────────────────────────
    {
        nodeId: 'proj-smartfan',
        card: { type: 'proj_smart_fan', title: 'Smart Fan Control', subtitle: 'Gesture-based fan control using Computer Vision and IoT' },
        keywords: ['smart fan', 'fan control', 'gesture', 'hand gesture', 'esp32 project', 'fan project'],
    },
    {
        nodeId: 'proj-driver',
        card: { type: 'proj_driver', title: 'Driver Safety Guard', subtitle: 'AI-powered drowsiness and distraction detection system' },
        keywords: ['driver safety', 'drowsiness', 'distraction', 'driver guard', 'driving safety', 'driver detection'],
    },
    {
        nodeId: 'proj-signsync',
        card: { type: 'proj_signsync', title: 'SignSync AI', subtitle: 'Real-time Sign Language Recognition with LSTM and MediaPipe' },
        keywords: ['signsync', 'sign language', 'sign recognition', 'asl', 'gesture recognition', 'lstm sign'],
    },
    {
        nodeId: 'proj-crimeguard',
        card: { type: 'proj_crimeguard', title: 'CrimeGuard ChatBot', subtitle: 'Hybrid multi-agent emergency assistant for Sri Lanka' },
        keywords: ['crimeguard', 'crime guard', 'emergency assistant', 'twilio', 'langgraph', 'sinhala', 'tamil', 'emergency bot'],
    },
    {
        nodeId: 'proj-blood',
        card: { type: 'proj_blood', title: 'Blood Malignancy Diagnostic', subtitle: 'ResNet-50 AI system for blood cell classification' },
        keywords: ['blood', 'malignancy', 'resnet', 'blood cell', 'diagnostic', 'cancer detection', 'medical ai'],
    },
    {
        nodeId: 'proj-facial',
        card: { type: 'proj_facial', title: 'Facial Landmark Detection', subtitle: 'Real-time HRNetV2 facial landmark detection with PyTorch' },
        keywords: ['facial landmark', 'face detection', 'hrnet', 'hrnetv2', 'face landmark', 'facial recognition'],
    },
    {
        nodeId: 'proj-license',
        card: { type: 'proj_license', title: 'License Plate Capture', subtitle: 'YOLOv11 system for Sri Lankan license plates' },
        keywords: ['license plate', 'number plate', 'yolo', 'yolov11', 'plate detection', 'sri lankan plate'],
    },

    // ── PORTFOLIO ─────────────────────────────────────────────────────────
    {
        nodeId: 'portfolio',
        card: { type: 'project_portfolio', title: 'k-b-r-s-w.github.io', subtitle: 'Personal portfolio — hub of projects, skills and identity' },
        keywords: ['portfolio', 'github.io', 'k-b-r-s-w', 'personal site', 'personal website', 'your site'],
    },

    // ── FRONTIER ──────────────────────────────────────────────────────────
    {
        nodeId: 'ai-agents',
        card: { type: 'frontier_agents', title: 'AI Agents & LLMs', subtitle: 'Exploring autonomous agents, LangChain and LangGraph' },
        keywords: ['ai agent', 'llm', 'langchain', 'langgraph', 'autonomous', 'large language model', 'agent system', 'hugging face'],
    },
    {
        nodeId: 'iot-frontier',
        card: { type: 'frontier_iot', title: 'IoT & Embedded AI', subtitle: 'Bridging AI models with real-world hardware' },
        keywords: ['iot frontier', 'edge ai', 'embedded ai', 'ai hardware', 'intelligent hardware', 'real world ai'],
    },
]

export function detectUnlocks(replyText) {
    if (!replyText) return []
    const lower = replyText.toLowerCase()
    const toUnlock = []
    for (const entry of SKILL_MAP) {
        if (entry.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
            toUnlock.push(entry.nodeId)
        }
    }
    return [...new Set(toUnlock)]
}

export function getCardsForNodes(nodeIds) {
    return nodeIds
        .map(id => SKILL_MAP.find(e => e.nodeId === id)?.card)
        .filter(Boolean)
}
