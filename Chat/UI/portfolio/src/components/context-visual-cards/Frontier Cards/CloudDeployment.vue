<template>
    <div class="p-4 m-3 context-detail">
        <div class="row">
            <div class="col-12">
                <h3 class="fw-bold pb-3">☁️ Cloud & Deployment</h3>
                <p>
                    <span class="fw-bold">Overview:</span><br>
                    I deploy portfolio and AI services with a practical cloud workflow: frontend hosting, backend API deployment, environment management, and cross-origin integration.
                </p>

                <div class="row">
                    <div class="col-lg-6 border-end">
                        <span class="fw-bold section-title">Deployment Stack:</span><br>
                        <ul>
                            <li>Vercel (Frontend + API hosting)</li>
                            <li>GitHub (source + version control)</li>
                            <li>Environment variables (.env / dashboard secrets)</li>
                            <li>Domain/CORS integration</li>
                        </ul>
                    </div>
                    <div class="col-lg-6 ps-5">
                        <span class="fw-bold section-title">Category:</span><br>
                        <ul>
                            <li>Cloud Deployment</li>
                            <li>DevOps Workflow</li>
                            <li>Production Operations</li>
                        </ul>
                    </div>
                </div>

                <span class="fw-bold section-title">Key Capabilities:</span><br>
                <ul>
                    <li>🌐 Deploy split frontend/backend architecture</li>
                    <li>🔐 Manage API keys and environment config safely</li>
                    <li>🔄 Update production through git-based workflow</li>
                    <li>🧪 Validate live endpoints and troubleshoot CORS</li>
                </ul>

                <p>
                    <span class="fw-bold">What I Learned:</span><br>
                    Reliable deployment depends on consistent configuration and clean separation between local and production environments. Small env mismatches can break otherwise-correct systems.
                </p>
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
