<template>
    <div class="container-fluid landing-shell" :class="isDarkMode ? 'theme-dark' : 'theme-light'">
        <div class="d-flex w-100 py-3 px-1 overflow-none top-strip">
            <div class="row w-100">
                <div class="col-8 justify-content-start d-flex align-items-center fs-4 fw-bolder">
                    Ravindu.dev
                </div>
                <div class="col-4 justify-content-end d-flex align-items-center gap-4 top-meta"
                    style="font-size: .8em;">
                    <span>Learn more about me</span>
                    <span class="d-flex align-items-center gap-2">
                        <div class="status-pip"></div>
                        Online
                    </span>
                    <span class="d-flex align-items-center gap-2">
                        Mode
                        <button
                            class="mode-toggle"
                            :class="isDarkMode ? 'is-dark' : 'is-light'"
                            @click="isDarkMode = !isDarkMode"
                            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
                            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
                        >
                            <span class="mode-toggle-thumb"></span>
                        </button>
                    </span>
                </div>
            </div>
        </div>

        <!-- ══ DESKTOP layout — Split.js panes, completely untouched ══ -->
        <div
            v-if="!isMobile"
            ref="splitContainer"
            class="w-100 px-1 overflow-hidden workspace-layout"
        >
            <div id="left-pane" class="border overflow-hidden">
                <ContentPanel ref="contentPanelRef" :is-dark-mode="isDarkMode" />
            </div>
            <div id="right-pane" class="border d-flex flex-column overflow-hidden">
                <div id="top-pane" class="overflow-hidden">
                    <SkillTree ref="skillTreeRef" :is-dark-mode="isDarkMode" />
                </div>
                <div id="bottom-pane" class="overflow-hidden">
                    <LiveChat :is-dark-mode="isDarkMode" @skills-unlocked="onSkillsUnlocked" />
                </div>
            </div>
        </div>

        <!-- ══ MOBILE layout — simple CSS grid, no Split.js ══ -->
        <div
            v-else
            class="mobile-workspace"
        >
            <div class="mobile-cell mobile-cell--context border overflow-hidden">
                <ContentPanel ref="contentPanelRef" :is-dark-mode="isDarkMode" />
            </div>
            <div class="mobile-cell mobile-cell--skills border overflow-hidden">
                <SkillTree ref="skillTreeRef" :is-dark-mode="isDarkMode" />
            </div>
            <div class="mobile-cell mobile-cell--chat border overflow-hidden">
                <LiveChat :is-dark-mode="isDarkMode" @skills-unlocked="onSkillsUnlocked" />
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

// ─── state ───────────────────────────────────────────────────────────────────
const splitCol = ref(null)
const splitRow = ref(null)
const isDarkMode = ref(false)
const isMobile = ref(false)

const MOBILE_BREAKPOINT = 992

// ─── split helpers ────────────────────────────────────────────────────────────
function destroySplits() {
    splitCol.value?.destroy()
    splitRow.value?.destroy()
    splitCol.value = null
    splitRow.value = null
}

function initDesktopSplits() {
    if (splitCol.value || splitRow.value) return

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
}

function syncLayoutMode() {
    const wasMobile = isMobile.value
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT

    if (!wasMobile && isMobile.value) {
        // desktop → mobile: destroy splits (v-if removes desktop DOM)
        destroySplits()
    }

    if (wasMobile && !isMobile.value) {
        // mobile → desktop: wait for v-if to mount desktop DOM then init
        setTimeout(initDesktopSplits, 50)
    }
}

onMounted(() => {
    syncLayoutMode()
    if (!isMobile.value) initDesktopSplits()
    window.addEventListener('resize', syncLayoutMode)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', syncLayoutMode)
    destroySplits()
})

// ─── skill unlock wiring ──────────────────────────────────────────────────────
const skillTreeRef = ref(null)
const contentPanelRef = ref(null)

function onSkillsUnlocked({ nodeIds, cards }) {
    skillTreeRef.value?.unlockNodes(nodeIds)
    cards.forEach(cardDef => contentPanelRef.value?.unlockCard(cardDef))
}
</script>

<style scoped>
.landing-shell {
    transition: background-color 0.25s ease, color 0.25s ease;
}

.theme-dark {
    background: #0f111a;
    color: #e5e7eb;
}

.theme-light {
    background: #f8f9fb;
    color: #1f2937;
}

.top-strip {
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
}

.top-meta {
    color: #6b7280;
}

.theme-dark .top-meta {
    color: #9ca3af;
}

.mode-toggle {
    position: relative;
    width: 42px;
    height: 22px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: #dbe2ea;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
}

.mode-toggle-thumb {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    transform: translateX(2px);
    transition: transform 0.2s ease;
}

.mode-toggle.is-dark {
    background: #2d5be3;
}

.mode-toggle.is-dark .mode-toggle-thumb {
    transform: translateX(22px);
}

/* ══ DESKTOP styles (Split.js) — exactly as original ══ */
.workspace-layout {
    display: flex;
    height: calc(100vh - 80px);
}

.theme-light #left-pane,
.theme-light #right-pane,
.theme-light #top-pane,
.theme-light #bottom-pane {
    background: #ffffff;
}

.theme-dark #left-pane,
.theme-dark #right-pane,
.theme-dark #top-pane,
.theme-dark #bottom-pane {
    background: #111827;
    border-color: rgba(255, 255, 255, 0.08) !important;
}

.gutter {
    background-color: #dee2e6;
    background-repeat: no-repeat;
    background-position: 50%;
}

.theme-dark .gutter {
    background-color: #1f2937;
}

.gutter.gutter-horizontal {
    cursor: col-resize;
}

.gutter.gutter-vertical {
    cursor: row-resize;
}

/* ══ MOBILE styles — completely separate classes, zero overlap with desktop ══ */
.mobile-workspace {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 360px 1fr;
    gap: 8px;
    height: calc(100vh - 80px);
    overflow: hidden;
    padding: 0 4px;
}

.mobile-cell {
    min-height: 0;
    overflow: hidden;
}

.mobile-cell--context {
    grid-column: 1;
    grid-row: 1;
}

.mobile-cell--skills {
    grid-column: 2;
    grid-row: 1;
}

.mobile-cell--chat {
    grid-column: 1 / span 2;
    grid-row: 2;
}

.theme-light .mobile-cell {
    background: #ffffff;
}

.theme-dark .mobile-cell {
    background: #111827;
    border-color: rgba(255, 255, 255, 0.08) !important;
}

/* very small screens — stack all 3 vertically */
@media (max-width: 480px) {
    .mobile-workspace {
        grid-template-columns: 1fr;
        grid-template-rows: 280px 280px 1fr;
    }

    .mobile-cell--context { grid-column: 1; grid-row: 1; }
    .mobile-cell--skills  { grid-column: 1; grid-row: 2; }
    .mobile-cell--chat    { grid-column: 1; grid-row: 3; }
}

/* ══ Status pip ══ */
.status-pip {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4caf82;
    flex-shrink: 0;
    animation: pip 2.4s ease-in-out infinite;
}

@keyframes pip {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.35; transform: scale(0.8); }
}
</style>
