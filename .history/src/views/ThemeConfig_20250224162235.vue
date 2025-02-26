<template>
  <div class="theme-config min-h-screen bg-gray-50 p-4">
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

const themes = ref([
  { name: '默认', color: '#3b82f6' },
  { name: '暗黑', color: '#1f2937' },
  { name: '清新', color: '#34d399' },
  { name: '优雅', color: '#fbbf24' },
])

const applyTheme = (themeName: string) => {
  // 这里可以添加主题应用逻辑
  console.log(`应用主题: ${themeName}`)
}
</script>

<style scoped>
.theme-config {
  background-color: #f9fafb; /* 背景色 */
}
</style> 