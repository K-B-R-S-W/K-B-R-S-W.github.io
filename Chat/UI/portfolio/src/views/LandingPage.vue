<template>
    <div class="container-fluid">
        <div class="d-flex w-100 py-3 px-1 overflow-none">
            <div class="row w-100">
                <div class="col-8 justify-content-start d-flex align-items-center fs-4 fw-bolder">
                    Ravindu.dev
                </div>
                <div class="col-4 justify-content-end d-flex align-items-center gap-4 text-secondary"
                    style="font-size: .8em;">
                    <span>Learn more about me</span>
                    <span class="d-flex align-items-center gap-2">
                        <div class="status-pip"></div>
                        Online
                    </span>
                </div>
            </div>
        </div>

        <div ref="splitContainer" class="d-flex w-100 px-1 overflow-hidden" style="height: calc(100vh - 80px);">
            <div id="left-pane" class="border overflow-hidden">
                <ContentPanel ref="contentPanelRef" />
            </div>
            <div id="right-pane" class="border d-flex flex-column overflow-hidden">
                <div id="top-pane" class="overflow-hidden">
                    <SkillTree ref="skillTreeRef" />
                </div>
                <div id="bottom-pane" class="overflow-hidden">
                    <LiveChat @skills-unlocked="onSkillsUnlocked" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Split from 'split.js'
import ContentPanel from '@/components/ContentPanel.vue'
import LiveChat from '@/components/LiveChat.vue'
import SkillTree from '@/components/SkillTree.vue'

// ─── split panes ─────────────────────────────────────────────────────────────
const splitCol = ref(null)
const splitRow = ref(null)

onMounted(() => {
    splitCol.value = Split(
        ['#left-pane', '#right-pane'],
        {
            sizes: [50, 50],
            minSize: 500,
            gutterSize: 8,
            cursor: 'col-resize',
            direction: 'horizontal',
        }
    )
    splitRow.value = Split(
        ['#top-pane', '#bottom-pane'],
        {
            sizes: [50, 50],
            minSize: 200,
            gutterSize: 8,
            cursor: 'row-resize',
            direction: 'vertical',
        }
    )
})

onBeforeUnmount(() => {
    splitCol.value?.destroy()
    splitRow.value?.destroy()
})

// ─── skill unlock wiring ──────────────────────────────────────────────────────
const skillTreeRef = ref(null)
const contentPanelRef = ref(null)

/**
 * Fired by LiveChat whenever the LLM reply triggers skill unlocks.
 *
 * payload = {
 *   nodeIds : string[]                        — SkillTree node IDs to unlock
 *   cards   : { type, title, subtitle }[]     — ContentPanel cards to surface
 * }
 */
function onSkillsUnlocked({ nodeIds, cards }) {
    skillTreeRef.value?.unlockNodes(nodeIds)
    cards.forEach(cardDef => contentPanelRef.value?.unlockCard(cardDef))
}
</script>

<style scoped>
.gutter {
    background-color: #dee2e6;
    background-repeat: no-repeat;
    background-position: 50%;
}

.gutter.gutter-horizontal {
    cursor: col-resize;
}

.gutter.gutter-vertical {
    cursor: row-resize;
}

.status-pip {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4caf82;
    flex-shrink: 0;
    animation: pip 2.4s ease-in-out infinite;
}

@keyframes pip {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.35;
        transform: scale(0.8);
    }
}
</style>