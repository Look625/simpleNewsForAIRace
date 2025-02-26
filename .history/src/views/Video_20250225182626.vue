<template>
  <div class="video-page min-h-screen bg-gray-50" @scroll="handleScroll">
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
    <main class="p-4 pb-16">
      <div class="scrollable-container" @scroll="handleScroll">
        <div v-if="isLoading" class="loading-indicator">加载中...</div>
        <div v-else>
          <div class="space-y-4">
            <div v-for="video in filteredVideos" :key="video.id" class="video-item bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" @click="goToVideo(video.id)">
              <h2 class="text-lg font-medium">{{ video.title }}</h2>
              <p class="text-sm text-gray-500">{{ video.description }}</p>
              <video controls class="w-full h-auto mt-2">
                <source :src="video.url" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div v-if="hasMore" class="load-more" @click="loadMore">加载更多</div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getVideosByCategory } from '@/mock/videos'

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
  author: {
    avatar: string
    name: string
  }
}

const videoItems = ref<Video[]>([])
const isLoading = ref(false)
const hasMore = ref(true)

// 状态管理
const activeCategory = ref('all')
const searchQuery = ref('')
const isSearching = ref(false)
const categoryContainer = ref<HTMLElement | null>(null)
const categoryButtons = ref<HTMLElement[]>([])

// 过滤视频
const filteredVideos = computed(() => {
  let result = videoItems.value
  
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

const loadVideos = async () => {
  isLoading.value = true
  const newVideos = await getVideosByCategory('all')
  videoItems.value = newVideos // 加载所有数据
  isLoading.value = false
}

const loadMore = () => {
  // 去掉分页加载逻辑
}

const handleScroll = () => {
  const contentArea = document.querySelector('.scrollable-container')
  if (contentArea.scrollTop + contentArea.clientHeight >= contentArea.scrollHeight - 100) {
    loadMore()
  }
}

// 初始化
onMounted(() => {
  loadVideos()
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

/* 瀑布流布局样式 */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--masonry-column-width), 1fr));
  gap: var(--masonry-gap);
  grid-auto-flow: dense;
}

@supports (grid-template-rows: masonry) {
  .masonry-grid {
    grid-template-rows: masonry;
    align-tracks: start;
  }
}

/* 对于不支持原生masonry的浏览器，使用列式布局 */
@supports not (grid-template-rows: masonry) {
  .masonry-grid {
    columns: auto var(--masonry-column-width);
    column-gap: var(--masonry-gap);
  }
  
  .masonry-grid .video-card {
    break-inside: avoid;
    margin-bottom: var(--masonry-gap);
  }
}

/* 视频卡片悬停效果 */
.video-card {
  transition: all 0.3s ease;
}

.video-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 图片加载优化 */
img {
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .masonry-grid {
    --masonry-column-width: 140px;
    --masonry-gap: 0.75rem;
  }
}

.scrollable-container {
  max-height: calc(100vh - 60px); /* 减去 TabBar 的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

.loading-indicator {
  text-align: center;
  padding: 20px;
}

.load-more {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: blue;
}
</style> 