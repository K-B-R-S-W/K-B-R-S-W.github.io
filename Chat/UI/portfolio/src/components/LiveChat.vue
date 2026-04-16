<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { api } from '@/services/api.js'
import { detectUnlocks, getCardsForNodes } from '@/services/skillMap.js'
import Chat from './cards/ChatCard.vue'
import SendBtn from './icons/SendBtn.vue'

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
    <div class="container-fluid d-flex flex-column h-100 bg-cream">
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
                        <Chat :user="msg.user" :time="msg.time" :convo="msg.convo" />
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
            <div class="row align-items-center py-2 flex-shrink-0">
                <div class="col-10">
                    <input
                        type="text"
                        id="convo"
                        placeholder="Ask me anything..."
                        v-model="userInput"
                        @keydown.enter.prevent="updateSession"
                        class="p-2 w-100 border border-light-subtle bg-light rounded-2"
                    />
                </div>
                <div class="col-2 d-flex justify-content-center">
                    <button class="bg-black rounded p-2" @click="updateSession">
                        <SendBtn />
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
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