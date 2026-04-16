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

const props = defineProps({ card: { type: Object, required: true } })
const emit = defineEmits(['toggle'])
</script>

<template>
    <div class="context-card border rounded-3 bg-white mb-2 overflow-hidden">
        <div class="d-flex align-items-center justify-content-between p-3 cursor-pointer select-none"
            style="cursor: pointer; user-select: none;" @click="emit('toggle')">
            <div>
                <div class="fw-bold" style="font-size: 0.95em;">{{ card.title }}</div>
                <div class="text-secondary" style="font-size: 0.78em;">{{ card.subtitle }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                class="chevron text-secondary flex-shrink-0 ms-2" :class="{ 'chevron--open': card.expanded }">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="card-body-wrapper" :class="{ 'card-body-wrapper--open': card.expanded }">
            <div class="card-body-inner border-top">
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
                <div v-else class="p-4"><p class="text-secondary">{{ card.title }}</p></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.context-card { transition: box-shadow 0.2s ease; }
.context-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.chevron { transition: transform 0.25s ease; }
.chevron--open { transform: rotate(180deg); }
.card-body-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
.card-body-wrapper--open { grid-template-rows: 1fr; }
.card-body-inner { overflow: hidden; }
</style>
