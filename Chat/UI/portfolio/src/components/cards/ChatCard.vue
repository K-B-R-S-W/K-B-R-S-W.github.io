<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    user: String,
    time: Number,   // timestamp (milliseconds)
    convo: String
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
                : 'bg-light text-dark rounded-end rounded-bottom border border-secondary-subtle'
        ]">
            <div class="d-flex small text-secondary mb-1" :class="[
                isUserMessage ? 'justify-content-end' : 'justify-content-start'
            ]">
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