<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    user: String,
    time: Number,   // timestamp (milliseconds)
    convo: String,
    isDarkMode: { type: Boolean, default: true }
})

const now = ref(Date.now())
let interval = null

onMounted(() => {
    interval = setInterval(() => {
        now.value = Date.now()
    }, 20000)
})

onBeforeUnmount(() => {
    clearInterval(interval)
})

const timeAgo = computed(() => {
    const diff = Math.floor((now.value - props.time) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`

    return `${Math.floor(diff / 86400)}d ago`
})

const isUserMessage = computed(() => props.user === 'You')
</script>

<template>
    <div class="d-flex w-100 p-2" :class="isUserMessage ? 'justify-content-end' : 'justify-content-start'">

        <div class="chat-bubble" :class="[
            isUserMessage
                ? 'bg-black text-white rounded-start rounded-bottom border border-dark-subtle'
                : (props.isDarkMode
                    ? 'bg-slate-800 text-slate-100 rounded-end rounded-bottom border border-slate-600'
                    : 'bg-light text-dark rounded-end rounded-bottom border border-secondary-subtle')
        ]">
            <div class="d-flex small mb-1" :class="[
                isUserMessage ? 'justify-content-end' : 'justify-content-start'
            ]" :style="{ color: isUserMessage ? '#cbd5e1' : (props.isDarkMode ? '#94a3b8' : '#6b7280') }">
                {{ user }} • {{ timeAgo }}
            </div>

            <div class="chat-text">
                {{ convo }}
            </div>
        </div>

    </div>
</template>

<style scoped>
.chat-bubble {
    max-width: 70%;
    padding: 10px 14px;
    word-break: break-word;
}

.chat-text {
    font-size: 0.95rem;
    line-height: 1.5;
    white-space: pre-line;
}
</style>