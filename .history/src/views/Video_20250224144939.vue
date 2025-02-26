<template>
  <div class="video">
    <header class="sticky top-0 bg-white shadow-md p-4">
      <h1 class="text-xl font-bold">视频</h1>
    </header>
    <main class="p-4 pb-16">
      <div class="video-list grid grid-cols-2 gap-4">
        <div v-for="i in 6" :key="i" class="bg-white rounded-lg overflow-hidden shadow">
          <div class="aspect-video bg-gray-200"></div>
          <div class="p-2">
            <h3 class="font-medium">视频标题示例</h3>
            <p class="text-sm text-gray-500 mt-1">1000次播放</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script> 