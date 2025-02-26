<template>
  <div class="article min-h-screen bg-gray-50">
    <!-- 头部导航 -->
    <header class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-10">
      <div class="flex items-center h-14 px-4">
        <button 
          @click="router.back()" 
          class="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex-1 flex justify-center">
          <div 
            class="text-base font-medium text-gray-800 transition-opacity duration-300"
            :class="{ 'opacity-0': !isScrolled }"
          >
            {{ article.title }}
          </div>
        </div>
        <button 
          class="w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
          @click="showShareMenu = true"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="pt-14">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="p-4 space-y-4">
        <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div class="aspect-video bg-gray-200 rounded-lg animate-pulse mt-4"></div>
        <div class="space-y-2 mt-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
      </div>

      <!-- 文章内容 -->
      <article v-else>
        <!-- 文章头部 -->
        <div class="relative">
          <!-- 封面图 -->
          <div class="w-full h-56 relative overflow-hidden">
            <img 
              :src="article.coverImage" 
              class="w-full h-full object-cover"
              alt="cover image"
            >
            <!-- 渐变遮罩 -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          </div>

          <!-- 文章标题和作者信息 -->
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h1 class="text-2xl font-bold leading-tight mb-3">{{ article.title }}</h1>
            <div class="flex items-center text-sm text-white/90">
              <img 
                :src="article.authorAvatar" 
                class="w-8 h-8 rounded-full border-2 border-white/50"
                alt="author avatar"
              >
              <div class="ml-2 flex-1">
                <div class="font-medium">{{ article.author }}</div>
                <div class="text-xs text-white/70 flex items-center mt-0.5">
                  <span>{{ article.publishTime }}</span>
                  <span class="mx-2">·</span>
                  <span>{{ article.readCount }} 阅读</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 文章主体 -->
        <div class="bg-white">
          <!-- 文章标签 -->
          <div class="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
            <span 
              v-for="tag in article.tags" 
              :key="tag"
              class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm whitespace-nowrap"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 文章内容 -->
          <div class="article-content p-4 text-gray-800">
            <div class="space-y-4 text-lg leading-relaxed">
              <p v-for="(paragraph, index) in article.content" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>

        <!-- 在文章内容后添加评论列表 -->
        <div class="bg-white mt-4 pb-20">
          <div class="px-4 py-3 border-b">
            <h2 class="text-lg font-medium">评论 {{ comments.length }}</h2>
          </div>
          <CommentList :comments="comments" />
        </div>
      </article>
    </main>

    <!-- 底部工具栏 -->
    <footer class="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
      <div class="flex items-center justify-between">
        <!-- 评论输入框 -->
        <div class="flex-1 mr-4">
          <input 
            type="text" 
            placeholder="写下你的评论..." 
            class="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- 操作按钮 -->
        <div class="flex items-center space-x-4 text-gray-600">
          <button class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <span class="ml-1">{{ article?.commentCount || 0 }}</span>
          </button>
          <button class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span class="ml-1">{{ article?.likeCount || 0 }}</span>
          </button>
          <button class="flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
              />
            </svg>
            <span class="ml-1">分享</span>
          </button>
        </div>
      </div>
    </footer>

    <!-- 分享菜单 -->
    <div 
      v-if="showShareMenu"
      class="fixed inset-0 bg-black/50 z-50 flex items-end"
      @click="showShareMenu = false"
    >
      <div 
        class="w-full bg-white rounded-t-2xl p-4"
        @click.stop
      >
        <div class="text-center mb-4">
          <h3 class="text-lg font-medium">分享到</h3>
        </div>
        <div class="grid grid-cols-4 gap-4 mb-6">
          <button 
            v-for="platform in sharePlatforms" 
            :key="platform.name"
            class="flex flex-col items-center"
          >
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-1"
              :class="platform.bgClass"
            >
              <component :is="platform.icon" class="w-6 h-6 text-white" />
            </div>
            <span class="text-xs text-gray-600">{{ platform.name }}</span>
          </button>
        </div>
        <button 
          class="w-full py-3 text-center text-gray-500 border-t"
          @click="showShareMenu = false"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CommentList from '@/components/CommentList.vue'

const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const isScrolled = ref(false)
const showShareMenu = ref(false)

interface Article {
  id: number
  title: string
  author: string
  authorAvatar: string
  publishTime: string
  readCount: number
  coverImage: string
  content: string[]
  tags: string[]
  commentCount: number
  likeCount: number
}

const article = ref<Article>({
  id: 1,
  title: '探索科技创新：人工智能如何改变我们的生活',
  author: '科技观察者',
  authorAvatar: 'https://picsum.photos/200/200?random=1',
  publishTime: '2024-01-20 10:30',
  readCount: 1234,
  coverImage: 'https://picsum.photos/800/400?random=1',
  content: [
    '人工智能技术正在以前所未有的速度发展，深刻影响着我们的日常生活。从智能手机助手到自动驾驶汽车，AI技术的应用范围正在不断扩大。',
    '近年来，机器学习算法的突破性进展使得AI系统能够更好地理解和处理复杂的人类需求。例如，自然语言处理技术的提升让人机交互变得更加自然和流畅。',
    '在医疗领域，AI辅助诊断系统已经展现出了巨大的潜力。通过分析大量的医疗影像数据，AI能够帮助医生更准确地发现疾病早期征兆。',
    '然而，AI技术的发展也带来了一些值得关注的问题。数据隐私、算法偏见等议题需要我们认真思考和解决。',
    '展望未来，AI技术将继续深化与各个行业的融合，创造更多创新应用场景。作为科技发展的见证者和参与者，我们需要以开放和理性的态度拥抱这些变革。'
  ],
  tags: ['人工智能', '科技创新', '未来趋势', '技术革新'],
  commentCount: 88,
  likeCount: 256
})

// 添加评论数据
const comments = ref([
  {
    id: 1,
    username: '科技爱好者',
    avatar: 'https://picsum.photos/200/200?random=10',
    content: '文章写得很好，对AI技术的分析很到位。特别是关于医疗领域的应用前景，让人很期待。',
    time: '2小时前',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 11,
        username: '医疗从业者',
        avatar: 'https://picsum.photos/200/200?random=11',
        content: '确实如此，我们医院已经在使用AI辅助诊断系统，效果很不错。',
        time: '1小时前',
        likes: 8,
        isLiked: false,
        replyTo: '科技爱好者'
      }
    ]
  },
  {
    id: 2,
    username: '数据分析师',
    avatar: 'https://picsum.photos/200/200?random=12',
    content: '关于数据隐私的讨论很有意义，这确实是AI发展中需要重点关注的问题。',
    time: '3小时前',
    likes: 15,
    isLiked: false
  }
])

// 修改评论输入框的处理
const commentContent = ref('')

const submitComment = () => {
  if (!commentContent.value.trim()) return
  
  const newComment = {
    id: Date.now(),
    username: '当前用户',
    avatar: 'https://picsum.photos/200/200?random=' + Date.now(),
    content: commentContent.value,
    time: '刚刚',
    likes: 0,
    isLiked: false
  }
  
  comments.value.unshift(newComment)
  commentContent.value = ''
}

// 模拟加载数据
const loadArticle = async (id: string) => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 这里可以替换为实际的API调用
    console.log('Loading article:', id)
  } finally {
    isLoading.value = false
  }
}

// 监听滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  const articleId = route.params.id as string
  loadArticle(articleId)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 分享平台配置
const sharePlatforms = [
  {
    name: '微信',
    icon: 'WechatIcon',
    bgClass: 'bg-green-500'
  },
  {
    name: '朋友圈',
    icon: 'MomentsIcon',
    bgClass: 'bg-green-600'
  },
  {
    name: '微博',
    icon: 'WeiboIcon',
    bgClass: 'bg-red-500'
  },
  {
    name: 'QQ',
    icon: 'QQIcon',
    bgClass: 'bg-blue-500'
  }
]
</script>

<style scoped>
.article-content {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* 添加渐变阴影效果 */
header {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* 优化底部工具栏按钮的触摸区域 */
footer button {
  padding: 8px;
  margin: -8px;
  border-radius: 9999px;
}

footer button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 文章内容的排版优化 */
.article-content p {
  text-align: justify;
  text-justify: inter-ideograph;
  word-break: break-word;
}

/* 添加新样式 */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 标题过长时的渐变效果 */
.article-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
}

/* 分享菜单动画 */
.share-menu-enter-active,
.share-menu-leave-active {
  transition: all 0.3s ease-out;
}

.share-menu-enter-from,
.share-menu-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style> 