<template>
  <div class="comments">
    <!-- 评论列表 -->
    <div class="space-y-4">
      <div 
        v-for="comment in comments" 
        :key="comment.id" 
        class="comment-item"
      >
        <!-- 主评论 -->
        <div class="flex">
          <img 
            :src="comment.avatar" 
            class="w-10 h-10 rounded-full"
            :alt="comment.username"
          >
          <div class="flex-1 ml-3">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-900">{{ comment.username }}</span>
              <button 
                class="text-gray-400 hover:text-blue-500"
                @click="toggleLike(comment)"
              >
                <div class="flex items-center">
                  <svg 
                    class="w-4 h-4" 
                    :class="{ 'text-red-500 fill-current': comment.isLiked }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span class="ml-1 text-xs">{{ comment.likes }}</span>
                </div>
              </button>
            </div>
            <p class="mt-1 text-gray-800">{{ comment.content }}</p>
            <div class="mt-2 flex items-center text-xs text-gray-500">
              <span>{{ comment.time }}</span>
              <button 
                class="ml-4 hover:text-blue-500"
                @click="toggleReply(comment)"
              >
                回复
              </button>
            </div>

            <!-- 回复框 -->
            <div v-if="comment.showReply" class="mt-3">
              <div class="flex">
                <input 
                  v-model="comment.replyContent"
                  type="text"
                  class="flex-1 px-3 py-2 bg-gray-100 rounded-l-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="回复评论..."
                >
                <button 
                  class="px-4 bg-blue-500 text-white rounded-r-full text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @click="submitReply(comment)"
                >
                  发送
                </button>
              </div>
            </div>

            <!-- 回复列表 -->
            <div v-if="comment.replies && comment.replies.length > 0" class="mt-3 space-y-3">
              <div 
                v-for="reply in comment.replies" 
                :key="reply.id"
                class="flex pt-3 border-t border-gray-100"
              >
                <img 
                  :src="reply.avatar" 
                  class="w-8 h-8 rounded-full"
                  :alt="reply.username"
                >
                <div class="flex-1 ml-3">
                  <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-900">{{ reply.username }}</span>
                    <button 
                      class="text-gray-400 hover:text-blue-500"
                      @click="toggleLike(reply)"
                    >
                      <div class="flex items-center">
                        <svg 
                          class="w-4 h-4"
                          :class="{ 'text-red-500 fill-current': reply.isLiked }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span class="ml-1 text-xs">{{ reply.likes }}</span>
                      </div>
                    </button>
                  </div>
                  <p class="mt-1 text-gray-800">
                    <span class="text-blue-500">@{{ reply.replyTo }}</span> {{ reply.content }}
                  </p>
                  <div class="mt-2 text-xs text-gray-500">{{ reply.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Reply {
  id: number
  username: string
  avatar: string
  content: string
  time: string
  likes: number
  isLiked: boolean
  replyTo: string
}

interface Comment {
  id: number
  username: string
  avatar: string
  content: string
  time: string
  likes: number
  isLiked: boolean
  replies?: Reply[]
  showReply?: boolean
  replyContent?: string
}

const props = defineProps<{
  comments: Comment[]
}>()

const toggleLike = (item: Comment | Reply) => {
  item.isLiked = !item.isLiked
  item.likes += item.isLiked ? 1 : -1
}

const toggleReply = (comment: Comment) => {
  comment.showReply = !comment.showReply
  comment.replyContent = ''
}

const submitReply = (comment: Comment) => {
  if (!comment.replyContent?.trim()) return
  
  const newReply: Reply = {
    id: Date.now(),
    username: '当前用户',
    avatar: 'https://picsum.photos/200/200?random=' + Date.now(),
    content: comment.replyContent,
    time: '刚刚',
    likes: 0,
    isLiked: false,
    replyTo: comment.username
  }

  if (!comment.replies) {
    comment.replies = []
  }
  comment.replies.unshift(newReply)
  comment.showReply = false
  comment.replyContent = ''
}
</script>

<style scoped>
.comment-item {
  position: relative;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: background-color 0.2s;
}

.comment-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style> 