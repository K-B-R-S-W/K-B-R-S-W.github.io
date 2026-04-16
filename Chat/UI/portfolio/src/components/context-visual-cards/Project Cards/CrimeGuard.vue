<template>
    <div class="p-4 m-3 context-detail">
        <div class="row">
            <div class="col-12">
                <h3 class="fw-bold pb-3">🚨 CrimeGuard ChatBot</h3>
                <p><span class="fw-bold">Overview:</span><br>
                A hybrid multi-agent emergency assistant built specifically for Sri Lanka. Combines autonomous AI detection, automated Twilio emergency phone calls, LangGraph intelligent routing, MongoDB tracking, and multilingual TTS and STT support in English, Sinhala and Tamil.</p>
                <div class="row">
                    <div class="col-lg-6 border-end">
                        <span class="fw-bold">Tech Stack:</span><br>
                        <ul><li>Python</li><li>Twilio</li><li>LangGraph</li><li>MongoDB</li><li>FastAPI</li><li>Node.js</li><li>ngrok</li></ul>
                    </div>
                    <div class="col-lg-6 ps-5">
                        <span class="fw-bold">Category:</span><br>
                        <ul><li>AI Agents</li><li>NLP</li><li>Emergency Systems</li><li>Multilingual AI</li></ul>
                    </div>
                </div>
                <span class="fw-bold">Key Features:</span><br>
                <ul>
                    <li>🤖 Hybrid agent architecture with autonomous AI decision routing via LangGraph</li>
                    <li>📞 Automated Twilio emergency calls when threat detected</li>
                    <li>🗣️ Multilingual TTS and STT supporting English, Sinhala and Tamil</li>
                    <li>📊 MongoDB real-time incident tracking and logging</li>
                    <li>⚡ FastAPI backend with ngrok for rapid deployment and testing</li>
                </ul>
                <p><span class="fw-bold">What I Learned:</span><br>
                Building CrimeGuard gave me deep experience with multi-agent orchestration, real-time communication pipelines and the complexity of multilingual NLP. It's my most ambitious project to date.</p>
                <a href="https://github.com/K-B-R-S-W/CrimeGuard_ChatBot" target="_blank" class="btn btn-dark btn-sm mt-2">View on GitHub →</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.context-detail p {
    line-height: 1.65;
    margin-bottom: 14px;
}

.context-detail ul {
    margin: 8px 0 14px;
    padding-left: 1.2rem;
    list-style: disc;
}

.context-detail li {
    margin-bottom: 6px;
    line-height: 1.5;
}

.section-title {
    display: inline-block;
    margin-bottom: 2px;
}
</style>
