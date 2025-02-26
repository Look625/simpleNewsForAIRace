<template>
  <div class="profile">
    <header class="sticky top-0 bg-white shadow-md p-4">
      <h1 class="text-xl font-bold">个人中心</h1>
    </header>
    <main class="p-4 pb-16">
      <div class="user-info bg-white p-4 rounded-lg shadow cursor-pointer" @click="router.push('/profile/edit')">
        <div class="flex items-center">
          <div class="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="avatar" class="w-full h-full object-cover">
          </div>
          <div class="ml-4 flex-1">
            <h2 class="text-lg font-semibold">{{ userInfo.nickname || '用户名' }}</h2>
            <p class="text-gray-500 flex items-center justify-between">
              <span>编辑个人资料</span>
              <span class="text-lg">→</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 主题设置部分 -->
      <div class="mt-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">主题设置</h3>
          <button 
            @click="router.push('/profile/theme-config')"
            class="text-blue-500 hover:text-blue-600"
          >
            配置主题
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="theme in themeStore.activeThemes" 
            :key="theme.value"
            @click="changeTheme(theme.value)"
            class="h-16 rounded-lg flex items-center justify-center transition-transform"
            :class="[
              currentTheme === theme.value ? 'ring-2 ring-blue-500 scale-95' : 'ring-1 ring-gray-200',
              theme.bgClass
            ]"
          >
            {{ theme.label }}
          </button>
        </div>

        <!-- 自定义主题设置 -->
        <div v-if="currentTheme === 'custom'" class="mt-4">
          <h4 class="font-medium mb-2">自定义颜色</h4>
          <div class="space-y-3">
            <div v-for="(color, key) in customColors" :key="key" class="flex items-center">
              <label :for="key" class="w-24 text-sm">{{ colorLabels[key] }}</label>
              <input
                :id="key"
                type="color"
                v-model="customColors[key]"
                @change="updateCustomColors"
                class="w-8 h-8 p-0 border-0"
              />
              <input
                type="text"
                v-model="customColors[key]"
                @change="updateCustomColors"
                class="ml-2 px-2 py-1 text-sm border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, type ThemeType, type ThemeColors } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)

const router = useRouter()

const themes = [
  { label: '浅色模式', value: 'light', bgClass: 'bg-white text-gray-800' },
  { label: '深色模式', value: 'dark', bgClass: 'bg-gray-800 text-white' },
  { label: '蓝色主题', value: 'blue', bgClass: 'bg-blue-500 text-white' },
  { label: '绿色主题', value: 'green', bgClass: 'bg-green-500 text-white' },
  { label: '自定义主题', value: 'custom', bgClass: 'theme-primary text-white' }
]

const colorLabels = {
  primary: '主要颜色',
  secondary: '次要颜色',
  background: '背景颜色',
  text: '文字颜色'
}

const customColors = reactive<ThemeColors>(themeStore.$state.customColors)

const changeTheme = (theme: ThemeType) => {
  themeStore.setTheme(theme)
  if (theme === 'custom') {
    themeStore.applyCustomColors()
  }
}

const updateCustomColors = () => {
  themeStore.setCustomColors(customColors)
}

// 用户信息
const userInfo = reactive({
  avatar: '',
  nickname: ''
})
</script> 