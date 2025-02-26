<template>
  <div class="theme-config min-h-screen bg-gray-50 p-4">
    <!-- 返回按钮 -->
    <button @click="router.back()" class="mb-4 text-gray-600 hover:bg-gray-100 p-2 rounded-full">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <h1 class="text-2xl font-bold mb-4 text-gray-800">主题配置</h1>
    <div class="grid grid-cols-2 gap-4">
      <button 
        v-for="theme in themes" 
        :key="theme.value" 
        class="p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        :style="{ background: theme.bgColor, color: theme.value === 'custom' ? 'white' : 'black' }"
        @click="applyTheme(theme.value)"
      >
        <h2 class="text-lg font-semibold">{{ theme.label }}</h2>
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
  { label: '浅色模式', value: 'light', bgClass: 'bg-white text-gray-800', bgColor: 'white' },
  { label: '深色模式', value: 'dark', bgClass: 'bg-gray-800 text-white', bgColor: 'gray' },
  { label: '蓝色主题', value: 'blue', bgClass: 'bg-blue-500 text-white', bgColor: 'blue' },
  { label: '绿色主题', value: 'green', bgClass: 'bg-green-500 text-white', bgColor: 'green' },
  // { label: '自定义主题', value: 'custom', bgClass: 'theme-primary text-white', bgColor: 'purple' },
])

const applyTheme = (themeName: string) => {
  themeStore.saveThemeConfig(themeName, themeStore.customColors)
  console.log(`应用主题: ${themeName}`)
}
</script>

<style scoped>
.theme-config {
  background-color: #f9fafb; /* 背景色 */
}
</style> 