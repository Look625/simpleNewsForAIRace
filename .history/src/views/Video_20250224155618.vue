<template>
  <div class="video-page min-h-screen bg-gray-50">
    <!-- 头部搜索栏 -->
    <header class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="flex items-center p-4">
        <div class="flex-1 relative">
          <input 
            v-model="searchQuery"
            type="search" 
            placeholder="搜索视频" 
            @input="handleSearch"
            class="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <svg 
            class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" 
            :class="{ 'text-blue-500': isSearching }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button 
            v-show="searchQuery"
            @click="clearSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center bg-gray-200/70 hover:bg-gray-300/70 active:bg-gray-400/70 transition-colors"
          >
            <svg 
              class="w-4 h-4 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2.5" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="category-wrapper">
        <div 
          ref="categoryContainer" 
          class="flex space-x-2 px-4 pb-3 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          <button 
            v-for="category in categories" 
            :key="category.id"
            ref="categoryButtons"
            @click="handleCategoryClick(category.id)"
            class="px-5 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200"
            :class="[
              activeCategory === category.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="p-4">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="grid grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <div class="aspect-video bg-gray-200 rounded-xl animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>

      <!-- 视频列表 -->
      <div v-else>
        <!-- 搜索结果提示 -->
        <div 
          v-if="searchQuery && !isLoading" 
          class="text-sm text-gray-500 mb-4"
        >
          找到 {{ filteredVideos.length }} 个相关视频
        </div>

        <!-- 无搜索结果提示 -->
        <div 
          v-if="searchQuery && !isLoading && filteredVideos.length === 0" 
          class="text-center py-8"
        >
          <div class="text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>未找到相关视频</p>
          </div>
        </div>

        <!-- 视频网格 -->
        <div class="grid grid-cols-2 gap-4">
          <div 
            v-for="video in filteredVideos" 
            :key="video.id"
            class="video-card group cursor-pointer"
            @click="goToVideo(video.id)"
          >
            <!-- 视频封面 -->
            <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
              <img 
                :src="video.cover" 
                class="w-full h-full object-cover"
                :alt="video.title"
              >
              <!-- 时长标签 -->
              <div class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs">
                {{ video.duration }}
              </div>
              <!-- 播放按钮 -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <!-- 视频信息 -->
            <div class="mt-2">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2">{{ video.title }}</h3>
              <div class="mt-1 flex items-center text-xs text-gray-500">
                <span>{{ video.views }}次观看</span>
                <span class="mx-1">·</span>
                <span>{{ video.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 分类数据
const categories = [
  { id: 'all', name: '推荐' },
  { id: 'game', name: '游戏' },
  { id: 'music', name: '音乐' },
  { id: 'sports', name: '体育' },
  { id: 'tech', name: '科技' },
  { id: 'food', name: '美食' },
  { id: 'travel', name: '旅游' }
]

// 视频数据
interface Video {
  id: number
  title: string
  cover: string
  duration: string
  views: string
  time: string
  category: string
}

const videos = ref<Video[]>([
  {
    id: 1,
    title: '2024年最值得期待的科技产品盘点',
    cover: 'https://picsum.photos/400/225?random=1',
    duration: '12:34',
    views: '10.2万',
    time: '2天前',
    category: 'tech'
  },
  {
    id: 2,
    title: '美食vlog：探访米其林三星餐厅',
    cover: 'https://picsum.photos/400/225?random=2',
    duration: '15:20',
    views: '8.5万',
    time: '3天前',
    category: 'food'
  },
  {
    id: 3,
    title: '2024年环球旅行指南：必去的10个目的地',
    cover: 'https://picsum.photos/400/225?random=3',
    duration: '18:45',
    views: '12.8万',
    time: '1天前',
    category: 'travel'
  },
  {
    id: 4,
    title: '游戏实况：最新RPG大作通关攻略',
    cover: 'https://picsum.photos/400/225?random=4',
    duration: '25:16',
    views: '15.6万',
    time: '5小时前',
    category: 'game'
  }
])

// 状态管理
const activeCategory = ref('all')
const isLoading = ref(true)
const searchQuery = ref('')
const isSearching = ref(false)
const categoryContainer = ref<HTMLElement | null>(null)
const categoryButtons = ref<HTMLElement[]>([])

// 过滤视频
const filteredVideos = computed(() => {
  let result = videos.value
  
  if (activeCategory.value !== 'all') {
    result = result.filter(video => video.category === activeCategory.value)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(video => 
      video.title.toLowerCase().includes(query)
    )
  }
  
  return result
})

// 处理搜索
const handleSearch = () => {
  isSearching.value = true
  setTimeout(() => {
    isSearching.value = false
  }, 300)
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 分类点击
const handleCategoryClick = (categoryId: string) => {
  if (categoryId === activeCategory.value) return
  
  activeCategory.value = categoryId
  searchQuery.value = ''
  
  const buttonIndex = categories.findIndex(c => c.id === categoryId)
  const button = categoryButtons.value[buttonIndex]
  const container = categoryContainer.value
  
  if (button && container) {
    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2)
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }
}

// 跳转到视频详情
const goToVideo = (id: number) => {
  router.push({
    name: 'VideoDetail',
    params: { id: id.toString() }
  })
}

// 初始化
onMounted(async () => {
  // 模拟加载
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
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

.category-wrapper {
  position: relative;
  overflow: hidden;
}

.category-wrapper::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  background: linear-gradient(to left, rgb(255 255 255), transparent);
  pointer-events: none;
}

.category-wrapper::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  background: linear-gradient(to right, rgb(255 255 255), transparent);
  pointer-events: none;
  z-index: 1;
}

/* 优化分类标签样式 */
.category-wrapper button {
  font-weight: 500;
  letter-spacing: 0.01em;
}

.category-wrapper button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-wrapper button.bg-blue-500 {
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.category-wrapper button:not(.bg-blue-500):hover {
  background-color: rgba(229, 231, 235, 0.8);
}

.category-wrapper button:active {
  transform: translateY(1px);
}

/* 视频卡片动画 */
.video-card {
  transition: transform 0.2s;
}

.video-card:active {
  transform: scale(0.98);
}
</style> 