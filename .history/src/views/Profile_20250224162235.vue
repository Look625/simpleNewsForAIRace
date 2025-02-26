<template>
  <div class="profile min-h-screen bg-gray-50">
    <!-- 头部背景 -->
    <div class="bg-blue-500 h-32 relative">
      <header class="sticky top-0 z-10">
        <h1 class="text-xl font-bold text-white p-4">个人中心</h1>
      </header>
    </div>

    <!-- 主要内容 -->
    <main class="px-4 -mt-16 pb-20 relative z-10">
      <!-- 用户信息卡片 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
        <div class="p-4" @click="router.push('/profile/edit')">
          <div class="flex items-center">
            <div class="relative">
              <div class="w-20 h-20 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white">
                <img 
                  v-if="userStore.userInfo.avatar" 
                  :src="userStore.userInfo.avatar" 
                  alt="avatar" 
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <h2 class="text-xl font-semibold text-gray-800">
                {{ userStore.userInfo.nickname || '点击设置昵称' }}
              </h2>
              <p class="text-gray-500 mt-1 text-sm flex items-center">
                <span>编辑个人资料</span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </p>
            </div>
          </div>
        </div>

        <!-- 用户数据统计 -->
        <div class="grid grid-cols-4 divide-x border-t">
          <div class="p-3 text-center">
            <div class="text-lg font-semibold text-gray-800">0</div>
            <div class="text-xs text-gray-500">关注</div>
          </div>
          <div class="p-3 text-center">
            <div class="text-lg font-semibold text-gray-800">0</div>
            <div class="text-xs text-gray-500">粉丝</div>
          </div>
          <div class="p-3 text-center">
            <div class="text-lg font-semibold text-gray-800">0</div>
            <div class="text-xs text-gray-500">获赞</div>
          </div>
          <div class="p-3 text-center">
            <div class="text-lg font-semibold text-gray-800">0</div>
            <div class="text-xs text-gray-500">收藏</div>
          </div>
        </div>
      </div>

      <!-- 主题设置卡片 -->
      <div class="bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">主题设置</h3>
          <button 
            @click="router.push('/profile/theme-config')"
            class="text-blue-500 hover:text-blue-600 flex items-center text-sm"
          >
            <span>配置主题</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="theme in themeStore.activeThemes" 
            :key="theme.value"
            @click="changeTheme(theme.value)"
            class="h-16 rounded-xl flex items-center justify-center transition-all duration-200"
            :class="[
              currentTheme === theme.value 
                ? 'ring-2 ring-blue-500 scale-95 shadow-inner' 
                : 'ring-1 ring-gray-200 hover:shadow-md',
              theme.bgClass
            ]"
          >
            {{ theme.label }}
          </button>
        </div>

        <!-- 自定义主题设置 -->
        <div v-if="currentTheme === 'custom'" class="mt-6 border-t pt-4">
          <h4 class="font-medium text-gray-700 mb-3">自定义颜色</h4>
          <div class="space-y-4">
            <div v-for="(_, key) in customColors" :key="key" class="flex items-center">
              <label :for="key" class="w-24 text-sm text-gray-600">{{ colorLabels[key] }}</label>
              <div class="flex items-center flex-1">
                <input
                  :id="key"
                  type="color"
                  v-model="customColors[key]"
                  @change="updateCustomColors"
                  class="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  v-model="customColors[key]"
                  @change="updateCustomColors"
                  class="ml-3 px-3 py-2 text-sm border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他功能区块 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="divide-y">
          <div class="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <span class="ml-3 text-gray-700">我的收藏</span>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div class="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="ml-3 text-gray-700">浏览历史</span>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div class="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="ml-3 text-gray-700">设置</span>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </main>

    <router-link to="/profile/theme-config">
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        主题设置
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, type ThemeType, type ThemeColors } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)

const router = useRouter()

const userStore = useUserStore()

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
</script> 