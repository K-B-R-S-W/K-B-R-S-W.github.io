<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { api } from '@/services/api.js'
import { detectUnlocks, getCardsForNodes } from '@/services/skillMap.js'
import Chat from './cards/ChatCard.vue'
import SendBtn from './icons/SendBtn.vue'

const props = defineProps({
    isDarkMode: { type: Boolean, default: true }
})

// ─── props / emits ──────────────────────────────────────────────────────────
// Parent listens for `skills-unlocked` to drive SkillTree + ContentPanel
const emit = defineEmits(['skills-unlocked'])

// ─── session state ──────────────────────────────────────────────────────────
const sessionId   = ref(null)
const greeting    = ref('')
const conversations = ref([])

const userInput  = ref('')
const isTyping   = ref(false)
const bottomAnchor = ref(null)

function scrollToBottom() {
    nextTick(() => {
        bottomAnchor.value?.scrollIntoView({ behavior: 'smooth' })
    })
}

watch([conversations, isTyping], scrollToBottom, { deep: true })

onMounted(() => {
    api.fetchSession().then(session => {
        sessionId.value = session?.session_id || null
        greeting.value  = session?.greeting || "Hey! I'm Ravindu's digital clone. Ask me anything!"
        conversations.value = [{ user: 'Ravindu', time: Date.now(), convo: greeting.value }]
    }).catch(e => {
        console.error('Failed to start chat session:', e)
    })
})

// ─── send message ────────────────────────────────────────────────────────────
async function updateSession() {
    if (!userInput.value.trim()) return

    const userMsg = { user: 'You', time: Date.now(), convo: userInput.value.trim() }
    conversations.value.push(userMsg)
    userInput.value = ''
    isTyping.value  = true

    try {
        const res = await api.updateSession({
            session_id: sessionId.value,
            message: userMsg.convo,
        })

        if (res?.reply) {
            // 1. Show the reply in the chat
            conversations.value.push({ user: 'Ravindu', time: Date.now(), convo: res.reply })

            // 2. Detect which skill-tree nodes the reply is about
            const unlockedNodeIds = detectUnlocks(res.reply)

            if (unlockedNodeIds.length > 0) {
                // 3. Resolve which content cards should surface alongside those nodes
                const cardsToAdd = getCardsForNodes(unlockedNodeIds)

                // 4. Bubble everything up to the parent (App / layout component)
                emit('skills-unlocked', {
                    nodeIds: unlockedNodeIds,
                    cards:   cardsToAdd,
                })
            }
        }
    } catch (e) {
        console.error('Failed to update chat session:', e)
    } finally {
        userInput.value = ''
        isTyping.value  = false
    }
}
</script>

<template>
    <div class="container-fluid d-flex flex-column h-100 chat-shell" :class="props.isDarkMode ? 'theme-dark' : 'theme-light'">
        <div class="col-12 d-flex flex-column h-100">

            <!-- Header -->
            <div class="row p-4 border-bottom d-flex align-items-center justify-content-center flex-shrink-0">
                <div class="col-12 d-flex justify-content-center align-items-center gap-3">
                    <span class="bg-black py-2 px-3 fw-italic text-white">R</span>
                    <span class="fw-bold">Ravindu's - Digital Portfolio</span>
                </div>
            </div>

            <!-- Messages -->
            <div ref="scrollContainer" class="row border-bottom overflow-y-auto flex-grow-1">
                <div class="col-12">
                    <div v-for="msg in conversations" :key="msg.time">
                        <Chat :user="msg.user" :time="msg.time" :convo="msg.convo" :is-dark-mode="props.isDarkMode" />
                    </div>

                    <!-- Typing indicator -->
                    <div v-if="isTyping" class="typing-indicator p-2">
                        <label class="rounded-circle bg-black p-1 px-2 text-white" style="font-size: .8em;">R</label>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div ref="bottomAnchor"></div>
                </div>
            </div>

            <!-- Input -->
            <div class="chat-input-wrap flex-shrink-0">
                <div class="chat-input-field-wrap">
                    <input
                        type="text"
                        id="convo"
                        placeholder="Ask me anything..."
                        v-model="userInput"
                        @keydown.enter.prevent="updateSession"
                        class="chat-input-field"
                    />
                </div>
                <div class="chat-send-wrap">
                    <button class="chat-send-btn" @click="updateSession" aria-label="Send message" title="Send">
                        <SendBtn />
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.chat-shell.theme-dark {
    background: #111827;
    color: #e5e7eb;
}

.chat-shell.theme-light {
    background: #f5f3ef;
    color: #111827;
}

.chat-input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-top: 1px solid rgba(148, 163, 184, 0.25);
}

.chat-input-field-wrap {
    flex: 1;
}

.chat-input-field {
    width: 100%;
    height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.chat-shell.theme-light .chat-input-field {
    background: #ffffff;
    color: #111827;
}

.chat-shell.theme-dark .chat-input-field {
    background: #0b1220;
    color: #e5e7eb;
    border-color: rgba(148, 163, 184, 0.35);
}

.chat-input-field:focus {
    border-color: #2d5be3;
    box-shadow: 0 0 0 3px rgba(45, 91, 227, 0.15);
}

.chat-send-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-send-btn {
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 10px;
    background: #111827;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-send-btn:hover {
    background: #1f2937;
}

.typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 12px;
    width: fit-content;
}

.typing-indicator span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #8e8e93;
    border-radius: 50%;
    animation: typing-bounce 1.2s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: 0s; }
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30%            { transform: translateY(-5px); opacity: 1; }
}
</style>