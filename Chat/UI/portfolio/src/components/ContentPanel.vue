<script setup>
import { ref } from 'vue'
import ContextCard from './cards/ContextCard.vue'

const cards = ref([
    { id: 1,  title: 'Ravindu Sankalpa',               subtitle: 'AI & Data Science Engineer — building intelligent systems', expanded: true,  type: 'intro',             unlocked: true  },
    { id: 2,  title: 'BSc Data Science — SLTC',         subtitle: 'BSc (Hons) in Data Science from SLTC Research University',  expanded: false, type: 'edu_bsc',           unlocked: false },
    { id: 3,  title: 'Smart Fan Control',               subtitle: 'Gesture-based fan control using Computer Vision and IoT',    expanded: false, type: 'proj_smart_fan',    unlocked: false },
    { id: 4,  title: 'Driver Safety Guard',             subtitle: 'AI-powered drowsiness and distraction detection',            expanded: false, type: 'proj_driver',       unlocked: false },
    { id: 5,  title: 'SignSync AI',                     subtitle: 'Real-time Sign Language Recognition with LSTM & MediaPipe',  expanded: false, type: 'proj_signsync',     unlocked: false },
    { id: 6,  title: 'CrimeGuard ChatBot',              subtitle: 'Hybrid multi-agent emergency assistant for Sri Lanka',       expanded: false, type: 'proj_crimeguard',   unlocked: false },
    { id: 7,  title: 'Blood Malignancy Diagnostic',     subtitle: 'ResNet-50 AI system for blood cell classification',          expanded: false, type: 'proj_blood',        unlocked: false },
    { id: 8,  title: 'Facial Landmark Detection',       subtitle: 'Real-time HRNetV2 facial landmark detection with PyTorch',   expanded: false, type: 'proj_facial',       unlocked: false },
    { id: 9,  title: 'License Plate Capture System',    subtitle: 'YOLOv11 system for Sri Lankan license plates',               expanded: false, type: 'proj_license',      unlocked: false },
    { id: 10, title: 'k-b-r-s-w.github.io',            subtitle: 'Personal portfolio — hub of projects, skills and identity',  expanded: false, type: 'project_portfolio', unlocked: false },
    { id: 11, title: 'AI Agents & LLMs',                subtitle: 'Exploring autonomous agents, LangChain and LangGraph',       expanded: false, type: 'frontier_agents',   unlocked: false },
    { id: 12, title: 'IoT & Embedded AI',               subtitle: 'Bridging AI models with real-world hardware',                expanded: false, type: 'frontier_iot',      unlocked: false },
])

let nextId = cards.value.length + 1

const highlight = ref('Chat with Ravindu to unlock cards!')

function setHighlight(text, duration = 4000) {
    highlight.value = text
    setTimeout(() => { highlight.value = 'Chat with Ravindu to unlock cards!' }, duration)
}

function toggleCard(id) {
    const card = cards.value.find(c => c.id === id)
    if (card) card.expanded = !card.expanded
}

function unlockCard(cardDef) {
    const existing = cards.value.find(c => c.type === cardDef.type)
    if (existing) {
        if (!existing.unlocked) {
            existing.unlocked = true
            existing.expanded = true
            existing.justUnlocked = true
            setTimeout(() => { existing.justUnlocked = false }, 3000)
            setHighlight(`🔓 Unlocked: ${existing.title}`)
        }
    } else {
        cards.value.unshift({ id: nextId++, title: cardDef.title, subtitle: cardDef.subtitle, type: cardDef.type, expanded: true, unlocked: true, justUnlocked: true })
        setHighlight(`🔓 Unlocked: ${cardDef.title}`)
        setTimeout(() => { const c = cards.value.find(cd => cd.type === cardDef.type); if (c) c.justUnlocked = false }, 3000)
    }
}

defineExpose({ unlockCard })
</script>

<template>
    <div class="container-fluid bg-cream d-flex flex-column h-100 overflow-y-auto" style="scrollbar-width: none;">
        <div class="col-12 d-flex flex-column h-100">
            <div class="row p-4 border-bottom flex-shrink-0">
                <div class="col-6">
                    <div class="row text-secondary text-uppercase pb-1" style="font-size: 0.8em;">context panel</div>
                    <div class="row fw-bolder">Related Content</div>
                </div>
                <div class="col-6 d-flex justify-content-end align-items-center">
                    <div class="border border-primary align-items-center bg-primary-subtle rounded-3 px-2 py-1">
                        <label class="text-primary fw-bold" style="font-size: 0.75em;">{{ highlight }}</label>
                    </div>
                </div>
            </div>
            <div class="flex-grow-1 overflow-y-auto p-3" style="scrollbar-width: none;">
                <TransitionGroup name="card-reveal" tag="div">
                    <template v-for="card in cards" :key="card.id">
                        <div v-if="card.unlocked" class="card-wrapper" :class="{ 'card-just-unlocked': card.justUnlocked }">
                            <ContextCard :card="card" @toggle="toggleCard(card.id)" />
                        </div>
                    </template>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style>
.card-reveal-enter-active { transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.card-reveal-enter-from { opacity: 0; transform: translateY(-12px) scale(0.97); }
.card-just-unlocked { animation: unlockPulse 0.6s ease-out; }
@keyframes unlockPulse { 0% { box-shadow: 0 0 0 0 rgba(45, 91, 227, 0.4); } 60% { box-shadow: 0 0 0 10px rgba(45, 91, 227, 0); } 100% { box-shadow: none; } }
</style>
