<template>
  <div class="profile-edit min-h-screen bg-gray-50 flex flex-col">
    <!-- 头部 -->
    <header class="sticky top-0 z-10 bg-white shadow-md p-4">
      <div class="flex items-center justify-between">
        <button @click="router.back()" class="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-medium">编辑个人资料</h1>
        <div class="w-10"></div>
      </div>
    </header>

    <!-- 表单内容区域 -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-4 max-w-2xl mx-auto pb-32">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 头像上传 -->
          <div class="flex flex-col items-center py-6">
            <div class="relative group">
              <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-lg">
                <img 
                  v-if="form.avatar" 
                  :src="form.avatar" 
                  alt="avatar" 
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleAvatarChange"
                class="hidden"
                ref="fileInput"
              >
              <button
                type="button"
                @click="fileInput?.click()"
                class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-lg 
                       transform transition hover:scale-110 hover:bg-blue-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </button>
            </div>
            <p class="mt-2 text-sm text-gray-500">点击修改头像</p>
          </div>

          <!-- 基本信息 -->
          <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">昵称</label>
              <input
                v-model="form.nickname"
                type="text"
                class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入昵称"
              >
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">性别</label>
              <div class="flex space-x-6">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="form.gender" 
                    value="male" 
                    class="w-4 h-4 text-blue-500 focus:ring-blue-500"
                  >
                  <span class="ml-2">男</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    v-model="form.gender" 
                    value="female" 
                    class="w-4 h-4 text-blue-500 focus:ring-blue-500"
                  >
                  <span class="ml-2">女</span>
                </label>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">生日</label>
              <input
                v-model="form.birthday"
                type="date"
                class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">个人简介</label>
              <textarea
                v-model="form.bio"
                rows="3"
                class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="介绍一下自己吧"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">手机号码</label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入手机号码"
              >
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">邮箱</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入邮箱"
              >
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div class="max-w-2xl mx-auto p-4">
        <button
          @click="handleSubmit"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium transform transition 
                 hover:bg-blue-600 hover:shadow-lg active:scale-95 disabled:opacity-50"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '保存中...' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { UserInfo } from '@/types/user'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const isSubmitting = ref(false)

const form = reactive<UserInfo>({
  avatar: '',
  nickname: '',
  gender: '',
  birthday: '',
  bio: '',
  phone: '',
  email: ''
})

// 处理头像上传
const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.avatar = e.target.result as string
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

// 处理表单提交
const handleSubmit = async () => {
  if (isSubmitting.value) return

  try {
    isSubmitting.value = true

    // 表单验证
    if (!form.nickname?.trim()) {
      alert('请输入昵称')
      return
    }

    if (form.phone && !/^1[3-9]\d{9}$/.test(form.phone)) {
      alert('请输入正确的手机号码')
      return
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert('请输入正确的邮箱地址')
      return
    }
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 返回上一页
    router.back()
  } catch (error) {
    console.error('提交失败：', error)
    alert('保存失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* 修复iOS中input的默认样式 */
input[type="date"] {
  -webkit-appearance: none;
}

/* 美化滚动条 */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* 确保iOS中内容不会被底部工具栏遮挡 */
.profile-edit {
  padding-bottom: env(safe-area-inset-bottom);
}
</style> 