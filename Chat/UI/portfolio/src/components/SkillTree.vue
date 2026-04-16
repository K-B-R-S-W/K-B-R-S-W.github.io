<template>
    <div class="skill-tree-container bg-cream">
        <div class="tree-header">
            <div class="tree-header-label">What You Know</div>
            <div class="tree-header-row">
                <div class="tree-header-title">About Ravindu</div>
                <div class="discovery-count">{{ unlockedCount }} / {{ totalNodes }} unlocked</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
        </div>

        <div class="tree-wrap" ref="treeWrapRef" @wheel.prevent="onWheel" @mousedown="onPanStart" @mousemove="onPanMove"
            @mouseup="onPanEnd" @mouseleave="onPanEnd" @touchstart.prevent="onTouchStart"
            @touchmove.prevent="onTouchMove" @touchend="onTouchEnd"
            :style="{ cursor: isPanning ? 'grabbing' : 'grab' }">

            <div class="zoom-controls">
                <button class="zoom-btn" @click.stop="zoomIn" title="Zoom in">+</button>
                <button class="zoom-btn zoom-reset" @click.stop="resetZoom" title="Reset view">⊙</button>
                <button class="zoom-btn" @click.stop="zoomOut" title="Zoom out">−</button>
            </div>

            <svg :viewBox="`-60 -60 ${SVG_W} ${SVG_H}`" xmlns="http://www.w3.org/2000/svg" class="tree-svg"
                :style="{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})`, transformOrigin: 'center center' }">

                <line v-for="conn in connections" :key="conn.id" :x1="conn.x1" :y1="conn.y1" :x2="conn.x2" :y2="conn.y2"
                    :class="['connector', { active: isConnectionActive(conn) }]" />

                <g v-for="node in nodes" :key="node.id" :transform="`translate(${node.x}, ${node.y})`" class="hex-group"
                    :class="{ unlocked: node.unlocked, locked: !node.unlocked }" @click="onNodeClick(node)">
                    <polygon :points="hexPoints(node.isCenter ? 26 : 22)" class="hex-bg" :style="hexStyle(node)" />
                    <text class="hex-icon" :style="{ opacity: node.unlocked ? 1 : 0.3 }" y="1">
                        {{ node.unlocked ? node.icon : '🔒' }}
                    </text>
                    <text class="hex-label" :y="node.isCenter ? 38 : 32" :class="{ unlocked: node.unlocked }">
                        {{ node.label }}
                    </text>
                    <g v-if="node.justUnlocked">
                        <rect x="-14" y="-34" width="28" height="12" rx="2" fill="#2d5be3" />
                        <text x="0" y="-25" class="new-badge">NEW</text>
                    </g>
                </g>
            </svg>
        </div>

        <div class="tree-legend">
            <div class="legend-item">
                <div class="legend-hex" style="background:#e8ecfb;border:1.5px solid #6c7fdd"></div>
                Identity / Skills
            </div>
            <div class="legend-item">
                <div class="legend-hex" style="background:#eef4ff;border:1.5px solid #4a72d4"></div>
                Tech Stack
            </div>
            <div class="legend-item">
                <div class="legend-hex" style="background:#fce8ea;border:1.5px solid #e06070"></div>
                Projects
            </div>
            <div class="legend-item">
                <div class="legend-hex" style="background:#f0ebff;border:1.5px solid #8b5cf6"></div>
                Frontier
            </div>
            <div class="legend-item">
                <div class="legend-hex" style="background:#f0ede8;border:1.5px solid #ccc9c1"></div>
                Locked
            </div>
        </div>

        <Transition name="tooltip">
            <div v-if="activeTooltip" class="node-tooltip">
                <div class="tooltip-icon">{{ activeTooltip.icon }}</div>
                <div class="tooltip-body">
                    <div class="tooltip-name">{{ activeTooltip.label }}</div>
                    <div class="tooltip-desc">{{ activeTooltip.description }}</div>
                    <div v-if="!activeTooltip.unlocked" class="tooltip-hint">Keep chatting to unlock this node</div>
                </div>
                <button class="tooltip-close" @click="activeTooltip = null">✕</button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ unlockedIds: { type: Array, default: () => ['center'] } })
const emit = defineEmits(['node-unlocked', 'node-clicked'])

const SVG_W = 1100
const SVG_H = 950

const nodes = ref([
    // CENTER
    { id: 'center', label: 'Ravindu', icon: '🧑‍💻', description: 'AI & Data Science Engineer. BSc Data Science grad from SLTC. Building intelligent systems with Python, TensorFlow, PyTorch and OpenCV.', x: 500, y: 400, zone: 'center', isCenter: true, unlocked: false, justUnlocked: false },

    // IDENTITY
    { id: 'origin', label: 'Sri Lanka', icon: '🇱🇰', description: 'Born and based in Sri Lanka — Maharagama, Western Province. Passionate about using AI to solve local and global problems.', x: 500, y: 220, zone: 'identity', unlocked: false, justUnlocked: false },
    { id: 'location', label: 'Maharagama', icon: '📍', description: 'Currently based in Maharagama, Western Province, Sri Lanka. Building AI systems from home.', x: 680, y: 265, zone: 'identity', unlocked: false, justUnlocked: false },
    { id: 'education', label: 'BSc Data Science', icon: '🎓', description: 'BSc (Hons) in Data Science from SLTC Research University, Sri Lanka. Specialized in AI, ML, Deep Learning and Computer Vision.', x: 720, y: 380, zone: 'identity', unlocked: false, justUnlocked: false },
    { id: 'drive', label: 'Passion for AI', icon: '🔥', description: 'Core drive: build intelligent systems that solve real-world problems using cutting-edge AI and ML technology.', x: 680, y: 535, zone: 'identity', unlocked: false, justUnlocked: false },
    { id: 'mindset', label: 'Innovator', icon: '💡', description: 'Highly motivated and adaptable. Loves contributing to open source, exploring new AI advancements and collaborating with industry experts.', x: 500, y: 580, zone: 'identity', unlocked: false, justUnlocked: false },

    // TECH - LEFT SIDE
    { id: 'languages', label: 'Languages', icon: '💬', description: 'Python, Java, C, C++, JavaScript, HTML, CSS, R, PHP, PowerShell. Python is the primary weapon of choice.', x: 280, y: 380, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'ai-ml', label: 'AI / ML', icon: '🧠', description: 'TensorFlow, PyTorch, Keras, scikit-learn. Deep expertise in the full ML lifecycle from data prep to deployment.', x: 320, y: 265, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'computer-vision', label: 'Computer Vision', icon: '👁️', description: 'OpenCV, YOLO, MediaPipe, HRNetV2. Real-time detection, tracking and landmark systems.', x: 320, y: 535, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'data-tools', label: 'Data Tools', icon: '📊', description: 'NumPy, Pandas, Matplotlib, Seaborn, Power BI, Snowflake, MLflow. Full data analytics pipeline.', x: 500, y: 90, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'backend', label: 'Backend', icon: '⚙️', description: 'Flask, FastAPI, Node.js. Building APIs and server-side systems for AI applications.', x: 820, y: 160, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'databases', label: 'Databases', icon: '🗄️', description: 'MySQL, MongoDB, Firebase. Structured and unstructured data management.', x: 920, y: 290, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'devops', label: 'DevOps', icon: '🔧', description: 'Git, GitHub, Docker, Postman, Anaconda, Jupyter. Full development workflow tools.', x: 920, y: 400, zone: 'tech', unlocked: false, justUnlocked: false },
    { id: 'iot', label: 'IoT', icon: '📡', description: 'ESP32, Arduino. Bridging AI models with real-world hardware and sensors.', x: 880, y: 510, zone: 'tech', unlocked: false, justUnlocked: false },

    // PROJECTS
    { id: 'proj-smartfan', label: 'Smart Fan', icon: '🌀', description: 'Gesture-based fan control using TensorFlow, OpenCV and ESP32. Real-time hand gesture recognition integrated with hardware.', x: 180, y: 160, zone: 'project', unlocked: false, justUnlocked: false },
    { id: 'proj-driver', label: 'Driver Safety', icon: '🚗', description: 'AI system detecting driver drowsiness, distraction and phone usage in real time using deep learning and facial landmarks.', x: 80, y: 290, zone: 'project', unlocked: false, justUnlocked: false },
    { id: 'proj-signsync', label: 'SignSync AI', icon: '🤟', description: 'Real-time sign language recognition with LSTM, MediaPipe Holistic (1662 landmarks), PyTorch and OpenCV.', x: 80, y: 400, zone: 'project', unlocked: false, justUnlocked: false },
    { id: 'proj-crimeguard', label: 'CrimeGuard', icon: '🚨', description: 'Hybrid multi-agent emergency assistant for Sri Lanka with Twilio calls, LangGraph routing and multilingual TTS/STT.', x: 120, y: 510, zone: 'project', unlocked: false, justUnlocked: false },
    { id: 'proj-blood', label: 'Blood Diagnostic', icon: '🩸', description: 'ResNet-50 deep learning model classifying blood cell types in an AI-powered web application.', x: 180, y: 620, zone: 'project', unlocked: false, justUnlocked: false },
    { id: 'proj-facial', label: 'Face Landmark', icon: '😶', description: 'Real-time facial landmark detection using HRNetV2 architecture with PyTorch and OpenCV.', x: 320, y: 695, zone: 'project', unlocked: false, justUnlocked: false },
    { id: 'proj-license', label: 'License Plate', icon: '🚘', description: 'YOLOv11 real-time license plate detection system trained specifically for Sri Lankan plates.', x: 500, y: 720, zone: 'project', unlocked: false, justUnlocked: false },

    // PORTFOLIO & FRONTIER
    { id: 'portfolio', label: 'Portfolio', icon: '🌐', description: 'Personal portfolio at k-b-r-s-w.github.io — hub of projects, skills and identity online.', x: 680, y: 695, zone: 'projects', unlocked: false, justUnlocked: false },
    { id: 'ai-agents', label: 'AI Agents', icon: '🤖', description: 'Exploring autonomous AI agents, LangChain, LangGraph and LLM-powered systems. CrimeGuard is the first step.', x: 820, y: 780, zone: 'frontier', unlocked: false, justUnlocked: false },
    { id: 'iot-frontier', label: 'Embedded AI', icon: '⚡', description: 'The frontier: deploying AI models directly onto embedded hardware — edge AI bridging intelligence and the physical world.', x: 500, y: 840, zone: 'frontier', unlocked: false, justUnlocked: false },
])

const connections = computed(() => {
    const n = Object.fromEntries(nodes.value.map(nd => [nd.id, nd]))
    return [
        { id: 'c-or', from: 'center', to: 'origin' },
        { id: 'c-lo', from: 'center', to: 'location' },
        { id: 'c-ed', from: 'center', to: 'education' },
        { id: 'c-dr', from: 'center', to: 'drive' },
        { id: 'c-mn', from: 'center', to: 'mindset' },
        { id: 'c-la', from: 'center', to: 'languages' },
        { id: 'c-ai', from: 'center', to: 'ai-ml' },
        { id: 'c-cv', from: 'center', to: 'computer-vision' },
        { id: 'ed-dt', from: 'education', to: 'data-tools' },
        { id: 'ed-bk', from: 'education', to: 'backend' },
        { id: 'bk-db', from: 'backend', to: 'databases' },
        { id: 'bk-dv', from: 'backend', to: 'devops' },
        { id: 'dv-iot', from: 'devops', to: 'iot' },
        { id: 'ai-sf', from: 'ai-ml', to: 'proj-smartfan' },
        { id: 'ai-dr', from: 'ai-ml', to: 'proj-driver' },
        { id: 'cv-ss', from: 'computer-vision', to: 'proj-signsync' },
        { id: 'cv-cg', from: 'computer-vision', to: 'proj-crimeguard' },
        { id: 'cv-bl', from: 'computer-vision', to: 'proj-blood' },
        { id: 'cv-fl', from: 'computer-vision', to: 'proj-facial' },
        { id: 'cv-lp', from: 'computer-vision', to: 'proj-license' },
        { id: 'dr-po', from: 'drive', to: 'portfolio' },
        { id: 'mn-ag', from: 'mindset', to: 'ai-agents' },
        { id: 'iot-ef', from: 'iot', to: 'iot-frontier' },
        { id: 'ag-ef', from: 'ai-agents', to: 'iot-frontier' },
    ].map(c => ({ ...c, x1: n[c.from]?.x ?? 0, y1: n[c.from]?.y ?? 0, x2: n[c.to]?.x ?? 0, y2: n[c.to]?.y ?? 0 }))
})

function isConnectionActive(conn) {
    const fromNode = nodes.value.find(n => n.id === conn.from)
    const toNode = nodes.value.find(n => n.id === conn.to)
    return fromNode?.unlocked && toNode?.unlocked
}

function hexPoints(r = 22) {
    return Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i - 30)
        return `${(r * Math.cos(angle)).toFixed(2)},${(r * Math.sin(angle)).toFixed(2)}`
    }).join(' ')
}

const ZONE_COLOURS = {
    center:   { fill: '#fff8e6', stroke: '#d4a017', lockFill: '#f5f3ef', lockStroke: '#ccc9c1' },
    identity: { fill: '#e8ecfb', stroke: '#6c7fdd', lockFill: '#f0ede8', lockStroke: '#ccc9c1' },
    tech:     { fill: '#eef4ff', stroke: '#4a72d4', lockFill: '#f0ede8', lockStroke: '#ccc9c1' },
    project:  { fill: '#fce8ea', stroke: '#e06070', lockFill: '#fce8ea', lockStroke: '#e0a0a8' },
    projects: { fill: '#e4f2f0', stroke: '#4aaba0', lockFill: '#f0ede8', lockStroke: '#ccc9c1' },
    frontier: { fill: '#f0ebff', stroke: '#8b5cf6', lockFill: '#f0ebff', lockStroke: '#c4b0f0' },
}

function hexStyle(node) {
    const z = ZONE_COLOURS[node.zone] ?? ZONE_COLOURS.identity
    if (node.unlocked) return { fill: z.fill, stroke: z.stroke, strokeWidth: '1.5' }
    return { fill: z.lockFill, stroke: z.lockStroke, strokeWidth: '1.5', opacity: node.zone === 'project' ? 0.45 : 1 }
}

const totalNodes = computed(() => nodes.value.length)
const unlockedCount = computed(() => nodes.value.filter(n => n.unlocked).length)
const progressPercent = computed(() => Math.round((unlockedCount.value / totalNodes.value) * 100))

function unlockNode(id) {
    const node = nodes.value.find(n => n.id === id)
    if (!node || node.unlocked) return
    node.unlocked = true
    node.justUnlocked = true
    emit('node-unlocked', { id, label: node.label, icon: node.icon })
    setTimeout(() => { node.justUnlocked = false }, 3000)
}

function unlockNodes(ids) { ids.forEach(id => unlockNode(id)) }

watch(() => props.unlockedIds, (ids) => { ids.forEach(id => unlockNode(id)) }, { immediate: true, deep: true })

defineExpose({ unlockNode, unlockNodes })

const treeWrapRef = ref(null)
const zoom = ref(3)
const panX = ref(0)
const panY = ref(0)
const ZOOM_MIN = 0.3, ZOOM_MAX = 3, ZOOM_STEP = 0.15

function clampZoom(val) { return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, val)) }
function zoomIn() { zoom.value = clampZoom(zoom.value + ZOOM_STEP) }
function zoomOut() { zoom.value = clampZoom(zoom.value - ZOOM_STEP) }
function resetZoom() { zoom.value = 1; panX.value = 0; panY.value = 0 }

function onWheel(e) {
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    const prevZoom = zoom.value
    const newZoom = clampZoom(prevZoom + delta)
    const rect = treeWrapRef.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2
    const scale = newZoom / prevZoom
    panX.value = mouseX + (panX.value - mouseX) * scale
    panY.value = mouseY + (panY.value - mouseY) * scale
    zoom.value = newZoom
}

const isPanning = ref(false)
let panStartX = 0, panStartY = 0

function onPanStart(e) { isPanning.value = true; panStartX = e.clientX - panX.value; panStartY = e.clientY - panY.value }
function onPanMove(e) { if (!isPanning.value) return; panX.value = e.clientX - panStartX; panY.value = e.clientY - panStartY }
function onPanEnd() { isPanning.value = false }

let lastTouchDist = null, panStartTX = 0, panStartTY = 0

function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
}

function onTouchStart(e) {
    if (e.touches.length === 2) { lastTouchDist = getTouchDist(e.touches) }
    else if (e.touches.length === 1) { isPanning.value = true; panStartTX = e.touches[0].clientX - panX.value; panStartTY = e.touches[0].clientY - panY.value }
}

function onTouchMove(e) {
    if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches)
        if (lastTouchDist) {
            const prevZoom = zoom.value
            const newZoom = clampZoom(prevZoom * (dist / lastTouchDist))
            const rect = treeWrapRef.value.getBoundingClientRect()
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left - rect.width / 2
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top - rect.height / 2
            const ratio = newZoom / prevZoom
            panX.value = midX + (panX.value - midX) * ratio
            panY.value = midY + (panY.value - midY) * ratio
            zoom.value = newZoom
        }
        lastTouchDist = dist
    } else if (e.touches.length === 1 && isPanning.value) {
        panX.value = e.touches[0].clientX - panStartTX
        panY.value = e.touches[0].clientY - panStartTY
    }
}

function onTouchEnd() { lastTouchDist = null; isPanning.value = false }

const activeTooltip = ref(null)
function onNodeClick(node) {
    activeTooltip.value = activeTooltip.value?.id === node.id ? null : node
    emit('node-clicked', node)
}
</script>

<style scoped>
.skill-tree-container { display: flex; flex-direction: column; height: 100%; overflow: hidden; position: relative; }
.tree-header { padding: 18px 20px 14px; border-bottom: 1px solid #e2dfd8; flex-shrink: 0; }
.tree-header-label { font-size: 9px; letter-spacing: 0.18em; color: #9a9690; text-transform: uppercase; margin-bottom: 4px; }
.tree-header-row { display: flex; align-items: flex-end; justify-content: space-between; }
.tree-header-title { font-size: 16px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.01em; }
.discovery-count { font-size: 10px; color: #2d5be3; letter-spacing: 0.06em; }
.progress-bar { margin-top: 10px; height: 2px; background: #e2dfd8; }
.progress-fill { height: 100%; background: #2d5be3; transition: width 0.6s ease; }
.tree-wrap { flex: 1; overflow: hidden; padding: 0; position: relative; display: flex; align-items: center; justify-content: center; user-select: none; }
.tree-svg { width: 100%; max-width: 310px; height: auto; overflow: visible; transition: transform 0.05s linear; will-change: transform; }
.zoom-controls { position: absolute; bottom: 14px; right: 14px; display: flex; flex-direction: column; gap: 4px; z-index: 20; }
.zoom-btn { width: 28px; height: 28px; background: #ffffff; border: 1px solid #e2dfd8; color: #444; font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.08); transition: background 0.15s, border-color 0.15s; padding: 0; border-radius: 4px; }
.zoom-btn:hover { background: #f5f3ef; border-color: #6c7fdd; color: #2d5be3; }
.zoom-reset { font-size: 13px; }
.connector { stroke: #e2dfd8; stroke-width: 1.5; fill: none; transition: stroke 0.4s ease; }
.connector.active { stroke: #c5d3f8; }
.hex-group { cursor: pointer; }
.hex-bg { transition: fill 0.35s ease, stroke 0.35s ease, opacity 0.2s ease; }
.hex-group:hover .hex-bg { opacity: 0.82; }
.hex-group.unlocked .hex-bg { filter: drop-shadow(0 1px 3px rgba(0,0,0,0.08)); }
.hex-icon { font-size: 13px; dominant-baseline: middle; text-anchor: middle; user-select: none; pointer-events: none; transition: opacity 0.3s ease; }
.hex-label { font-size: 6.5px; fill: #aaa; text-anchor: middle; dominant-baseline: middle; pointer-events: none; letter-spacing: 0.04em; text-transform: uppercase; }
.hex-label.unlocked { fill: #444; }
.new-badge { font-size: 6px; fill: #ffffff; text-anchor: middle; dominant-baseline: middle; letter-spacing: 0.1em; pointer-events: none; animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes badgePop { from { transform: scale(0); } to { transform: scale(1); } }
.tree-legend { padding: 12px 20px; border-top: 1px solid #e2dfd8; display: flex; gap: 16px; flex-shrink: 0; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 9px; color: #9a9690; letter-spacing: 0.06em; }
.legend-hex { width: 12px; height: 12px; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); flex-shrink: 0; }
.node-tooltip { position: absolute; bottom: 64px; left: 12px; right: 12px; background: #ffffff; border: 1px solid #e2dfd8; padding: 14px; display: flex; gap: 12px; align-items: flex-start; box-shadow: 0 4px 20px rgba(0,0,0,0.08); z-index: 10; }
.tooltip-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
.tooltip-body { flex: 1; min-width: 0; }
.tooltip-name { font-size: 13px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
.tooltip-desc { font-size: 12px; color: #666; line-height: 1.55; }
.tooltip-hint { font-size: 9px; color: #2d5be3; letter-spacing: 0.06em; margin-top: 6px; text-transform: uppercase; }
.tooltip-close { background: none; border: none; color: #9a9690; cursor: pointer; font-size: 11px; padding: 0; flex-shrink: 0; line-height: 1; }
.tooltip-close:hover { color: #1a1a1a; }
.tooltip-enter-active, .tooltip-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.tooltip-enter-from, .tooltip-leave-to { opacity: 0; transform: translateY(6px); }
</style>
