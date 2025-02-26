<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
    <div class="flex justify-around p-2">
      <router-link to="/" class="flex flex-col items-center">
        <i class="fas fa-home w-6 h-6 text-gray-600 hover:text-blue-500"></i>
        <span class="text-xs">首页</span>
      </router-link>
      <router-link to="/video" class="flex flex-col items-center">
        <i class="fas fa-video w-6 h-6 text-gray-600 hover:text-blue-500"></i>
        <span class="text-xs">视频</span>
      </router-link>
      <router-link to="/profile" class="flex flex-col items-center">
        <i class="fas fa-user w-6 h-6 text-gray-600 hover:text-blue-500"></i>
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