<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white shadow-md z-100">
    <div class="flex justify-around p-4">
      <router-link to="/" class="text-gray-600">首页</router-link>
      <router-link to="/video" class="text-blue-500">视频</router-link>
      <router-link to="/profile" class="text-gray-600">个人中心</router-link>
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