<template>
  <div class="app min-h-screen bg-gray-100">
    <router-view></router-view>
    <nav class="fixed bottom-0 w-full bg-white border-t">
      <div class="flex justify-around p-2">
        <router-link to="/" class="flex flex-col items-center">
          <span class="text-sm">首页</span>
        </router-link>
        <router-link to="/video" class="flex flex-col items-center">
          <span class="text-sm">视频</span>
        </router-link>
        <router-link to="/profile" class="flex flex-col items-center">
          <span class="text-sm">我的</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script> 