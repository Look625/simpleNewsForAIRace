<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white shadow-md z-100">
    <div class="flex justify-around p-4">
      <router-link to="/" class="flex flex-col items-center" active-class="text-blue-500">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <span class="text-xs">首页</span>
      </router-link>
      <router-link to="/video" class="flex flex-col items-center" active-class="text-blue-500">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span class="text-xs">视频</span>
      </router-link>
      <router-link to="/profile" class="flex flex-col items-center" active-class="text-blue-500">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-xs">我的</span>
      </router-link>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navItems } from '@/config/navigation'

const route = useRoute()
</script>

<style scoped>
footer {
  z-index: 100; /* 确保 TabBar 在其他内容之上 */
  background-color: white; /* 固定背景色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style> 