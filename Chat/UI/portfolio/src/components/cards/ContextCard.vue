<script setup>
import LinksView from '@/components/cards/LinksView.vue'
import IntroContext from '../context-visual-cards/IntroContext.vue'
import Bachelor from '../context-visual-cards/Personal Cards/Bachelor.vue'
import SmartFan from '../context-visual-cards/Project Cards/SmartFan.vue'
import DriverSafety from '../context-visual-cards/Project Cards/DriverSafety.vue'
import SignSync from '../context-visual-cards/Project Cards/SignSync.vue'
import CrimeGuard from '../context-visual-cards/Project Cards/CrimeGuard.vue'
import BloodDiagnostic from '../context-visual-cards/Project Cards/BloodDiagnostic.vue'
import FacialLandmark from '../context-visual-cards/Project Cards/FacialLandmark.vue'
import Portfolio from '../context-visual-cards/Project Cards/Portfolio.vue'
import LicensePlate from '../context-visual-cards/Project Cards/LicensePlate.vue'
import AIAgents from '../context-visual-cards/Frontier Cards/AIAgents.vue'
import EmbeddedAI from '../context-visual-cards/Frontier Cards/EmbeddedAI.vue'
import NLPApplications from '../context-visual-cards/Frontier Cards/NLPApplications.vue'
import MLOpsServing from '../context-visual-cards/Frontier Cards/MLOpsServing.vue'
import CloudDeployment from '../context-visual-cards/Frontier Cards/CloudDeployment.vue'

const props = defineProps({
    card: { type: Object, required: true },
    isDarkMode: { type: Boolean, default: true }
})
const emit = defineEmits(['toggle'])
</script>

<template>
    <div class="context-card border rounded-3 mb-2 overflow-hidden" :class="props.isDarkMode ? 'context-card--dark' : 'context-card--light'">
        <div class="d-flex align-items-center justify-content-between p-3 cursor-pointer select-none"
            style="cursor: pointer; user-select: none;" @click="emit('toggle')">
            <div>
                <div class="fw-bold context-title" style="font-size: 0.95em;">{{ card.title }}</div>
                <div class="context-subtitle" style="font-size: 0.78em;">{{ card.subtitle }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                class="chevron flex-shrink-0 ms-2" :class="{ 'chevron--open': card.expanded }">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="card-body-wrapper" :class="{ 'card-body-wrapper--open': card.expanded }">
            <div class="card-body-inner border-top" :class="props.isDarkMode ? 'card-body-inner--dark' : 'card-body-inner--light'">
                <IntroContext        v-if="card.type === 'intro'"             :card="card" />
                <Bachelor           v-else-if="card.type === 'edu_bsc'"           :card="card" />
                <SmartFan           v-else-if="card.type === 'proj_smart_fan'"    :card="card" />
                <DriverSafety       v-else-if="card.type === 'proj_driver'"       :card="card" />
                <SignSync           v-else-if="card.type === 'proj_signsync'"     :card="card" />
                <CrimeGuard         v-else-if="card.type === 'proj_crimeguard'"   :card="card" />
                <BloodDiagnostic    v-else-if="card.type === 'proj_blood'"        :card="card" />
                <FacialLandmark     v-else-if="card.type === 'proj_facial'"       :card="card" />
                <LicensePlate       v-else-if="card.type === 'proj_license'"      :card="card" />
                <Portfolio          v-else-if="card.type === 'project_portfolio'"  :card="card" />
                <AIAgents           v-else-if="card.type === 'frontier_agents'"   :card="card" />
                <EmbeddedAI         v-else-if="card.type === 'frontier_iot'"      :card="card" />
                <NLPApplications    v-else-if="card.type === 'skill_nlp'"         :card="card" />
                <MLOpsServing       v-else-if="card.type === 'skill_mlops'"       :card="card" />
                <CloudDeployment    v-else-if="card.type === 'skill_cloud'"       :card="card" />
                <div v-else class="p-4">
                    <p class="text-secondary fallback-text">{{ card.title }}</p>
                    <p v-if="card.subtitle" class="text-secondary fallback-text mt-2">{{ card.subtitle }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.context-card { transition: box-shadow 0.2s ease; }
.context-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.context-card--light {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.12) !important;
}
.context-card--dark {
    background: #0f172a;
    border-color: rgba(148, 163, 184, 0.3) !important;
}
.context-title {
    color: inherit;
}
.context-card--light .context-subtitle,
.context-card--light .chevron {
    color: #6b7280;
}
.context-card--dark .context-title {
    color: #e5e7eb;
}
.context-card--dark .context-subtitle,
.context-card--dark .chevron {
    color: #94a3b8;
}
.card-body-inner--light {
    border-top-color: rgba(15, 23, 42, 0.08) !important;
}
.card-body-inner--dark {
    border-top-color: rgba(148, 163, 184, 0.2) !important;
}
.chevron { transition: transform 0.25s ease; }
.chevron--open { transform: rotate(180deg); }
.card-body-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
.card-body-wrapper--open { grid-template-rows: 1fr; }
.card-body-inner { overflow: hidden; }
.fallback-text {
    white-space: pre-line;
    line-height: 1.6;
}
</style>
