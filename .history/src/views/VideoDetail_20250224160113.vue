<template>
  <div class="video-detail min-h-screen bg-gray-50">
    <!-- 视频播放区域 -->
    <div class="relative bg-black">
      <!-- 返回按钮 -->
      <button 
        @click="router.back()" 
        class="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
      >
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- 视频封面 -->
      <div class="aspect-video w-full">
        <img 
          v-if="!isPlaying"
          :src="video?.cover" 
          class="w-full h-full object-cover"
          alt=""
        >
        <!-- 播放按钮 -->
        <div 
          v-if="!isPlaying"
          class="absolute inset-0 flex items-center justify-center"
          @click="isPlaying = true"
        >
          <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <!-- 视频播放器 (这里用图片模拟) -->
        <img 
          v-else
          :src="video?.cover" 
          class="w-full h-full object-cover"
          alt=""
        >
      </div>
    </div>

    <!-- 视频信息 -->
    <div class="p-4 bg-white">
      <h1 class="text-lg font-medium text-gray-900">{{ video?.title }}</h1>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <span>{{ video?.views }}次观看</span>
        <span class="mx-2">·</span>
        <span>{{ video?.time }}</span>
      </div>
      
      <!-- 作者信息 -->
      <div class="flex items-center justify-between mt-4 pb-4 border-b">
        <div class="flex items-center">
          <img 
            :src="video?.author.avatar" 
            class="w-10 h-10 rounded-full"
            :alt="video?.author.name"
          >
          <div class="ml-3">
            <div class="font-medium text-gray-900">{{ video?.author.name }}</div>
            <div class="text-sm text-gray-500">{{ video?.author.followers }}粉丝</div>
          </div>
        </div>
        <button class="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600">
          关注
        </button>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-around py-3 border-b">
        <button class="flex flex-col items-center">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span class="mt-1 text-xs text-gray-500">{{ video?.likes }}</span>
        </button>
        <button class="flex flex-col items-center">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span class="mt-1 text-xs text-gray-500">评论</span>
        </button>
        <button class="flex flex-col items-center">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span class="mt-1 text-xs text-gray-500">分享</span>
        </button>
        <button class="flex flex-col items-center">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span class="mt-1 text-xs text-gray-500">收藏</span>
        </button>
      </div>

      <!-- 视频描述 -->
      <div class="mt-4">
        <h2 class="text-sm font-medium text-gray-900">视频简介</h2>
        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ video?.description }}</p>
        <!-- 标签 -->
        <div class="mt-3 flex flex-wrap gap-2">
          <span 
            v-for="tag in video?.tags" 
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- 推荐视频 -->
      <div class="mt-6">
        <h2 class="text-sm font-medium text-gray-900 mb-4">相关推荐</h2>
        <div class="space-y-4">
          <div 
            v-for="item in recommendVideos" 
            :key="item.id"
            class="flex space-x-3 cursor-pointer"
            @click="goToVideo(item.id)"
          >
            <div class="relative w-40 aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                :src="item.cover" 
                class="w-full h-full object-cover"
                :alt="item.title"
              >
              <div class="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-white text-xs">
                {{ item.duration }}
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2">{{ item.title }}</h3>
              <div class="mt-1 text-xs text-gray-500">
                <div>{{ item.author.name }}</div>
                <div class="mt-0.5">{{ item.views }}次观看 · {{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getVideoById, getVideosByCategory, type Video } from '@/mock/videos'

const router = useRouter()
const route = useRoute()
const video = ref<Video>()
const isPlaying = ref(false)

// 获取推荐视频
const recommendVideos = computed(() => {
  if (!video.value) return []
  return getVideosByCategory(video.value.category)
    .filter(v => v.id !== video.value?.id)
    .slice(0, 5)
})

// 跳转到视频
const goToVideo = (id: number) => {
  router.push({
    name: 'VideoDetail',
    params: { id: id.toString() }
  })
}

onMounted(() => {
  const videoId = parseInt(route.params.id as string)
  video.value = getVideoById(videoId)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 