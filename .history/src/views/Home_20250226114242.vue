<template>
  <div class="home min-h-screen bg-gray-50">
    <!-- 头部搜索栏 -->
    <header class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="flex items-center p-4">
        <div class="flex-1 relative">
          <input 
            v-model="searchQuery"
            type="search" 
            placeholder="搜索" 
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
    <main class="p-4 pb-16" ref="contentArea">
      <div class="scrollable-container">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="loading-indicator">加载中...</div>

        <!-- 内容 -->
        <div v-else>
          <Carousel :banners="banners" class="mb-6" />
          <div class="space-y-4">
            <article v-for="item in filteredNewsItems" :key="item.id" class="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" @click="goToArticle(item.id)">
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
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import newsData,{ getNewsByCategory, getBanners, type NewsItem, type Banner } from '@/mock/news'
import Carousel from '@/components/Carousel.vue'
import { useRouter } from 'vue-router'

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
const isLoading = ref(true)
const banners = ref<Banner[]>([])
const newsItems = ref<NewsItem[]>([])
const router = useRouter()

// 搜索相关状态
const searchQuery = ref('')
const isSearching = ref(false)
const searchDebounceTimer = ref<NodeJS.Timeout | null>(null)

// 过滤后的新闻列表
const filteredNewsItems = computed(() => {
  if (!searchQuery.value.trim()) return newsItems.value
  
  const query = searchQuery.value.toLowerCase()
  return newsItems.value.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query) ||
    item.source.toLowerCase().includes(query)
  )
})

// 处理搜索
const handleSearch = () => {
  // 清除之前的定时器
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }

  isSearching.value = true
  
  // 设置新的定时器，300ms 后执行搜索
  searchDebounceTimer.value = setTimeout(() => {
    loadData(activeCategory.value, searchQuery.value)
    isSearching.value = false
  }, 300)
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
  loadData(activeCategory.value)
}

// 修改加载数据函数，限制每个分类最多加载10条数据
const loadData = async (category: string, search: string = '') => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    banners.value = getBanners()
    let data = getNewsByCategory(category)
    
    // 限制每个分类最多加载10条数据
    newsItems.value = data.slice(0, 10);
  } finally {
    isLoading.value = false
  }
}

// 添加预加载功能
const preloadNextCategory = async (currentCategory: string) => {
  const currentIndex = categories.findIndex(c => c.id === currentCategory)
  const nextCategory = categories[currentIndex + 1]?.id
  if (nextCategory) {
    // 预加载下一个分类的数据
    await new Promise(resolve => setTimeout(resolve, 100))
    getBanners()
    getNewsByCategory(nextCategory)
  }
}

// 修改分类切换处理
const handleCategoryClick = async (categoryId: string) => {
  if (categoryId === activeCategory.value) return
  
  activeCategory.value = categoryId
  searchQuery.value = '' // 切换分类时清空搜索
  
  // 获取点击的按钮元素和容器
  const buttonIndex = categories.findIndex(c => c.id === categoryId)
  const button = categoryButtons.value[buttonIndex]
  const container = categoryContainer.value
  
  if (button && container) {
    // 计算按钮的中心位置和容器的中心位置
    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    
    // 计算需要滚动的距离，使按钮居中
    const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2)
    
    // 平滑滚动到目标位置
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }

  // 预加载下一个分类的数据
  preloadNextCategory(categoryId)
}

// 监听分类变化
watch(activeCategory, (newCategory) => {
  loadData(newCategory)
})

// 监听搜索词变化
watch(searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    loadData(activeCategory.value)
  }
})

const categoryContainer = ref<HTMLElement | null>(null)
const categoryButtons = ref<HTMLElement[]>([])

// 初始化时预加载第二个分类
onMounted(async () => {
  await loadData('all')
  preloadNextCategory('all')
  
  // 原有的分类居中逻辑保持不变
  if (categoryContainer.value && categoryButtons.value[0]) {
    categoryContainer.value.scrollLeft = 0
  }
})

// 跳转到文章详情页
const goToArticle = (id: number) => {
  router.push({
    name: 'Article',
    params: { id: id.toString() }
  })
}

const contentArea = ref<HTMLElement | null>(null)
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

/* 添加搜索相关样式 */
.search-active {
  @apply ring-2 ring-blue-500 bg-white;
}

/* 添加输入框动画 */
input[type="search"] {
  transition: all 0.2s ease;
}

input[type="search"]:focus {
  @apply bg-white shadow-sm;
}

/* 移除搜索框的默认清除按钮 */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

/* 清除按钮动画 */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: translateY(-50%) scale(0.95);
}

/* 优化分类标签样式 */
.category-wrapper button {
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* 移除 scale 动画，改用更细腻的过渡效果 */
.category-wrapper button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 优化激活状态的阴影效果 */
.category-wrapper button.bg-blue-500 {
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

/* 优化hover状态 */
.category-wrapper button:not(.bg-blue-500):hover {
  background-color: rgba(229, 231, 235, 0.8);
}

/* 优化点击反馈 */
.category-wrapper button:active {
  transform: translateY(1px);
}

.loading-indicator {
  text-align: center;
  padding: 20px;
}

.scrollable-container {
  max-height: calc(100vh - 60px); /* 减去 TabBar 的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}
</style> 