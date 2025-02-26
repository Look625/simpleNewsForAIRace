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
        class="w-full flex-shrink-0"
      >
        <img 
          :src="banner.image" 
          class="w-full h-full object-cover"
          :alt="banner.title"
        >
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h2 class="text-white text-lg font-medium">{{ banner.title }}</h2>
        </div>
      </div>
    </div>

    <!-- 指示器 -->
    <div class="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
      <button
        v-for="(_, index) in banners"
        :key="index"
        @click="setCurrentIndex(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="[
          currentIndex === index 
            ? 'bg-white w-4' 
            : 'bg-white/50 hover:bg-white/80'
        ]"
      />
    </div>

    <!-- 左右按钮 -->
    <button
      @click="prev"
      class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="next"
      class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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