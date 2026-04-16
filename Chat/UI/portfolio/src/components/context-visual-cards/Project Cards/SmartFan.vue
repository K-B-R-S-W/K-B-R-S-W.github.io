<template>
    <div class="p-4 m-3 context-detail">
        <div class="row">
            <div class="col-12">
                <h3 class="fw-bold pb-3">🌀 Smart Fan Control</h3>
                <p><span class="fw-bold">Overview:</span><br>
                An innovative gesture-based fan control system using Computer Vision and IoT. Real-time hand gesture recognition powered by TensorFlow and OpenCV, integrated with ESP32 microcontroller for hardware control of a physical fan.</p>
                <div class="row">
                    <div class="col-lg-6 border-end">
                        <span class="fw-bold">Tech Stack:</span><br>
                        <ul><li>Python</li><li>TensorFlow</li><li>OpenCV</li><li>ESP32</li></ul>
                    </div>
                    <div class="col-lg-6 ps-5">
                        <span class="fw-bold">Category:</span><br>
                        <ul><li>Computer Vision</li><li>IoT</li><li>Deep Learning</li></ul>
                    </div>
                </div>
                <span class="fw-bold">Key Features:</span><br>
                <ul>
                    <li>🖐️ Real-time hand gesture recognition using a trained TensorFlow model</li>
                    <li>⚡ ESP32 hardware integration for physical fan speed control</li>
                    <li>📷 OpenCV-based video stream processing for low-latency detection</li>
                    <li>🔄 Multiple gesture commands mapped to fan speed levels</li>
                </ul>
                <p><span class="fw-bold">What I Learned:</span><br>
                This project taught me how to bridge the gap between AI software and real-world hardware. Deploying a trained CV model onto an IoT pipeline gave me hands-on experience with edge inference and embedded system communication.</p>
                <a href="https://github.com/K-B-R-S-W/Smart-Fan-Control-Using-Image-Processing" target="_blank" class="btn btn-dark btn-sm mt-2">View on GitHub →</a>
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
