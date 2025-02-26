<template>
  <div class="profile">
    <header class="sticky top-0 bg-white shadow-md p-4">
      <h1 class="text-xl font-bold">个人中心</h1>
    </header>
    <main class="p-4 pb-16">
      <div class="user-info bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div class="ml-4">
            <h2 class="text-lg font-semibold">用户名</h2>
            <p class="text-gray-500">编辑个人资料</p>
          </div>
        </div>
      </div>

      <!-- 主题设置部分 -->
      <div class="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">主题设置</h3>
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="theme in themes" 
            :key="theme.value"
            @click="changeTheme(theme.value)"
            class="p-3 rounded-lg flex items-center justify-center"
            :class="[
              currentTheme === theme.value ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200',
              theme.bgClass
            ]"
          >
            {{ theme.label }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, type Theme } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)

const themes = [
  { label: '浅色模式', value: 'light', bgClass: 'bg-white text-gray-800' },
  { label: '深色模式', value: 'dark', bgClass: 'bg-gray-800 text-white' },
  { label: '蓝色主题', value: 'blue', bgClass: 'bg-blue-500 text-white' },
  { label: '绿色主题', value: 'green', bgClass: 'bg-green-500 text-white' }
]

const changeTheme = (theme: Theme) => {
  themeStore.setTheme(theme)
}
</script> 