<template>
  <div class="home">
    <header class="sticky top-0 bg-white shadow-md p-4">
      <h1 class="text-xl font-bold">今日头条</h1>
    </header>
    
    <main class="p-4 pb-16">
      <div class="news-list space-y-4">
        <div v-for="i in 5" :key="i" class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold">新闻标题示例</h2>
          <p class="text-gray-600 mt-2">这是一段新闻内容的描述，用来展示新闻的概要信息...</p>
          <div class="mt-2 text-sm text-gray-500">
            <span>1小时前</span>
            <span class="mx-2">·</span>
            <span>100评论</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script> 