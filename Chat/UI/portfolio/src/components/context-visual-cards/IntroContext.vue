<template>
    <div class="p-4 context-detail">
        <div class="row text-center">
            <h2 class="pb-4 fw-bold">I build intelligent systems that bridge AI with the real world — from computer vision to IoT.</h2>
        </div>
        <div class="row">
            <p>
                I'm <span class="fw-bolder">Ravindu Sankalpa</span> — a Data Science graduate and AI & ML engineer from Sri Lanka.
            </p>
        </div>
        <div class="row">
            <p>
                Ask me anything about my projects, tech stack, education or interests. Each conversation unlocks more about who I am and what I build.
            </p>
        </div>
        <div class="row">
            <LinksView />
        </div>
    </div>
</template>

<script setup>
import LinksView from '../cards/LinksView.vue'
</script>

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
