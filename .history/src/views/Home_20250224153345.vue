<template>
  <div class="home min-h-screen bg-gray-50">
    <!-- 头部搜索栏 -->
    <header class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="flex items-center p-4">
        <div class="flex-1 relative">
          <input 
            type="search" 
            placeholder="搜索" 
            class="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="flex space-x-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id"
          class="px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors"
          :class="activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'"
        >
          {{ category.name }}
        </button>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="p-4">
      <!-- 轮播图 -->
      <div class="mb-6 rounded-xl overflow-hidden shadow-lg relative aspect-[2/1] bg-gray-200">
        <img 
          :src="currentBanner.image" 
          class="w-full h-full object-cover"
          alt=""
        >
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h2 class="text-white text-lg font-medium">{{ currentBanner.title }}</h2>
        </div>
      </div>

      <!-- 内容列表 -->
      <div class="space-y-4">
        <article 
          v-for="item in newsItems" 
          :key="item.id" 
          class="bg-white rounded-xl p-4 shadow-sm"
        >
          <div class="flex space-x-4">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 line-clamp-2">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
              <div class="mt-2 flex items-center text-xs text-gray-400">
                <span>{{ item.source }}</span>
                <span class="mx-1">·</span>
                <span>{{ item.time }}</span>
                <span class="mx-1">·</span>
                <span>{{ item.comments }}评论</span>
              </div>
            </div>
            <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                :src="item.image" 
                class="w-full h-full object-cover"
                alt=""
              >
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 分类数据
const categories = [
  { id: 'all', name: '推荐' },
  { id: 'news', name: '新闻' },
  { id: 'tech', name: '科技' },
  { id: 'entertainment', name: '娱乐' },
  { id: 'sports', name: '体育' },
  { id: 'finance', name: '财经' },
  { id: 'lifestyle', name: '生活' }
]

const activeCategory = ref('all')

// 轮播图数据
const currentBanner = {
  image: 'https://picsum.photos/800/400',
  title: '热点新闻标题'
}

// 新闻列表数据
const newsItems = [
  {
    id: 1,
    title: '这是一个新闻标题，可能会很长很长很长很长很长很长',
    description: '这是新闻的简短描述，介绍一下新闻的主要内容。这是新闻的简短描述，介绍一下新闻的主要内容。',
    image: 'https://picsum.photos/200/200',
    source: '新闻来源',
    time: '2小时前',
    comments: 128
  },
  {
    id: 2,
    title: '另一个新闻标题',
    description: '这是另一条新闻的简短描述，介绍一下新闻的主要内容。',
    image: 'https://picsum.photos/200/200?random=2',
    source: '科技日报',
    time: '4小时前',
    comments: 56
  },
  {
    id: 3,
    title: '第三个新闻标题',
    description: '这是第三条新闻的简短描述，介绍一下新闻的主要内容。',
    image: 'https://picsum.photos/200/200?random=3',
    source: '体育周刊',
    time: '6小时前',
    comments: 89
  }
]
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 