<template>
  <div class="relative overflow-hidden rounded-xl shadow-lg aspect-[2/1]">
    <!-- 轮播图片 -->
    <div 
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="banner in banners" 
        :key="banner.id"
        class="w-full flex-shrink-0 relative"
      >
        <img 
          :src="banner.image" 
          class="w-full h-full object-cover"
          :alt="banner.title"
        >
        <!-- 优化渐变遮罩 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <!-- 优化文字容器 -->
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h2 class="text-white text-lg font-medium leading-snug drop-shadow-sm">
            {{ banner.title }}
          </h2>
        </div>
      </div>
    </div>

    <!-- 优化指示器样式 -->
    <div class="absolute bottom-14 left-0 right-0 flex justify-center gap-2 z-10">
      <button
        v-for="(_, index) in banners"
        :key="index"
        @click="setCurrentIndex(index)"
        class="w-1.5 h-1.5 rounded-full transition-all duration-300 bg-white/40 hover:bg-white/60"
        :class="[
          currentIndex === index 
            ? 'w-4 bg-white' 
            : ''
        ]"
      />
    </div>

    <!-- 优化左右按钮 -->
    <button
      @click="prev"
      class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center backdrop-blur-sm transition-all"
    >
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="next"
      class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center backdrop-blur-sm transition-all"
    >
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Banner } from '@/mock/news'

const props = defineProps<{
  banners: Banner[]
}>()

const currentIndex = ref(0)
let timer: NodeJS.Timer | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.banners.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.banners.length) % props.banners.length
}

const setCurrentIndex = (index: number) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  timer = setInterval(() => {
    next()
  }, 3000)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* 优化图片过渡效果 */
.transition-transform {
  will-change: transform;
}

/* 优化按钮触摸反馈 */
button:active {
  transform: translateY(-50%) scale(0.95);
}

/* 优化文字阴影 */
h2 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style> 