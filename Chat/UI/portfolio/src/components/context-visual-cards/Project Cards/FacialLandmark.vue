<template>
    <div class="p-4 m-3 context-detail">
        <div class="row">
            <div class="col-12">
                <h3 class="fw-bold pb-3">😶 Facial Landmark Detection</h3>
                <p><span class="fw-bold">Overview:</span><br>
                A real-time facial landmark detection system using the HRNetV2 architecture as its backbone. Accurately identifies and tracks facial landmarks at high precision using PyTorch and OpenCV for live video stream processing.</p>
                <div class="row">
                    <div class="col-lg-6 border-end">
                        <span class="fw-bold">Tech Stack:</span><br>
                        <ul><li>HRNetV2</li><li>PyTorch</li><li>OpenCV</li><li>NumPy</li></ul>
                    </div>
                    <div class="col-lg-6 ps-5">
                        <span class="fw-bold">Category:</span><br>
                        <ul><li>Computer Vision</li><li>Facial Analysis</li><li>Real-time Detection</li></ul>
                    </div>
                </div>
                <span class="fw-bold">Key Features:</span><br>
                <ul>
                    <li>🏗️ HRNetV2 high-resolution backbone for precise landmark localization</li>
                    <li>⚡ Real-time landmark tracking from live camera feed</li>
                    <li>🎯 High accuracy even under varied lighting and pose conditions</li>
                    <li>🔧 Modular PyTorch implementation for easy fine-tuning</li>
                </ul>
                <p><span class="fw-bold">What I Learned:</span><br>
                Working with HRNetV2 deepened my understanding of high-resolution representation learning and its advantages over standard encoder-decoder architectures for dense prediction tasks like landmark detection.</p>
                <a href="https://github.com/K-B-R-S-W/Facial_Landmark_Detection_Using_Pytorch" target="_blank" class="btn btn-dark btn-sm mt-2">View on GitHub →</a>
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
