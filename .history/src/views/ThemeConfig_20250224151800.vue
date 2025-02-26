<template>
  <div class="theme-config min-h-screen bg-gray-50 flex flex-col">
    <!-- 头部 -->
    <header class="sticky top-0 z-10 bg-white shadow-md p-4">
      <div class="flex items-center justify-between">
        <button @click="router.back()" class="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-medium">主题配置</h1>
        <div class="w-10"></div>
      </div>
    </header>

    <!-- 配置内容 -->
    <div class="flex-1 p-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow p-4">
          <p class="text-sm text-gray-500 mb-4">拖动调整顺序，最多显示5个主题</p>
          <div class="space-y-2">
            <div
              v-for="theme in themeStore.themeOptions"
              :key="theme.value"
              class="flex items-center h-16 bg-gray-50 rounded-lg px-4"
              :class="{ 'opacity-50': !theme.active }"
            >
              <div class="mr-4 cursor-move">≡</div>
              <div
                class="w-12 h-12 rounded-lg"
                :class="theme.bgClass"
              ></div>
              <span class="ml-4 flex-1">{{ theme.label }}</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="theme.active"
                  class="sr-only peer"
                  @change="toggleTheme(theme.value)"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-blue-300 rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

const toggleTheme = (value: ThemeType) => {
  themeStore.toggleTheme(value)
}
</script> 