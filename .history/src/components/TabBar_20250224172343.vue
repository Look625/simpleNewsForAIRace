<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
    <div class="flex justify-around p-2">
      <router-link to="/home" class="flex flex-col items-center">
        <svg class="w-6 h-6 text-gray-600 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l2-2m-2 2h18m-6 6l2-2m0 0l2-2m-2 2H3" />
        </svg>
        <span class="text-xs">首页</span>
      </router-link>
      <router-link to="/video" class="flex flex-col items-center">
        <svg class="w-6 h-6 text-gray-600 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12l-7 7V5l7 7z" />
        </svg>
        <span class="text-xs">视频</span>
      </router-link>
      <router-link to="/profile" class="flex flex-col items-center">
        <svg class="w-6 h-6 text-gray-600 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
        <span class="text-xs">我的</span>
      </router-link>
    </div>
  </nav>

  <!-- 底部安全区域占位 -->
  <div class="h-[60px]"></div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navItems } from '@/config/navigation'

const route = useRoute()
</script>

<style scoped>
.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  border-radius: 2px;
  background-color: currentColor;
}

nav {
  height: 60px; /* 确保导航高度 */
}
</style> 