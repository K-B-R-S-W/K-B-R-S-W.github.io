<template>
    <div class="p-4 m-3 context-detail">
        <div class="row">
            <div class="col-12">
                <h3 class="fw-bold pb-3">🚘 Sri Lankan License Plate Capture System</h3>
                <p><span class="fw-bold">Overview:</span><br>
                A real-time license plate detection system specifically trained for Sri Lankan license plates using YOLOv11. Supports live camera detection and is designed for traffic monitoring and vehicle identification applications in Sri Lanka.</p>
                <div class="row">
                    <div class="col-lg-6 border-end">
                        <span class="fw-bold">Tech Stack:</span><br>
                        <ul><li>Python</li><li>YOLOv11</li><li>OpenCV</li><li>Computer Vision</li></ul>
                    </div>
                    <div class="col-lg-6 ps-5">
                        <span class="fw-bold">Category:</span><br>
                        <ul><li>Object Detection</li><li>Traffic AI</li><li>Real-time Systems</li></ul>
                    </div>
                </div>
                <span class="fw-bold">Key Features:</span><br>
                <ul>
                    <li>🇱🇰 Custom-trained YOLOv11 model on Sri Lankan license plate dataset</li>
                    <li>📷 Real-time detection from live camera streams</li>
                    <li>🎯 High accuracy for both old and new Sri Lankan plate formats</li>
                    <li>⚡ Optimized for low-latency real-time inference</li>
                </ul>
                <p><span class="fw-bold">What I Learned:</span><br>
                This project gave me experience with custom dataset collection and annotation for a domain-specific detection task. Training YOLO on a localized dataset highlighted the importance of domain-specific data in object detection accuracy.</p>
                <a href="https://github.com/K-B-R-S-W/Realtime_Sri_Lankan_License_Plate_Capture_System_Using_Yolo_V11" target="_blank" class="btn btn-dark btn-sm mt-2">View on GitHub →</a>
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
