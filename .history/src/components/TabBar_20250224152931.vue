<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
    <div class="flex justify-around h-[60px]">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1"
        :class="[
          route.path === item.path 
            ? 'text-blue-500' 
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        <component
          :is="route.path === item.path ? item.activeIcon : item.icon"
          class="w-6 h-6 mb-1"
        />
        <span class="text-xs">{{ item.label }}</span>
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
</style> 