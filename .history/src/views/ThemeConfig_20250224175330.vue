<template>
  <div class="theme-config min-h-screen bg-gray-50 p-4">
    <!-- 返回按钮 -->
    <button @click="router.back()" class="mb-4 text-gray-600 hover:bg-gray-100 p-2 rounded-full">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <h1 class="text-2xl font-bold mb-4">主题配置</h1>
    <div class="grid grid-cols-2 gap-4">
      <button 
        v-for="theme in themes" 
        :key="theme.name" 
        class="p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        :style="{ backgroundColor: theme.color }"
        @click="applyTheme(theme.name)"
      >
        <h2 class="text-lg font-semibold text-white">{{ theme.name }}</h2>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

const themes = ref([
  { name: '默认', color: '#3b82f6' },
  { name: '暗黑', color: '#1f2937' },
  { name: '清新', color: '#34d399' },
  { name: '优雅', color: '#fbbf24' },
])

const applyTheme = (themeName: string) => {
  themeStore.setTheme(themeName)
  console.log(`应用主题: ${themeName}`)
}
</script>

<style scoped>
.theme-config {
  background-color: #f9fafb; /* 背景色 */
}
</style> 