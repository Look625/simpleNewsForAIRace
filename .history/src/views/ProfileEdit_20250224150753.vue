<template>
  <div class="profile-edit min-h-screen bg-gray-50">
    <!-- 头部 -->
    <header class="sticky top-0 z-10 bg-white shadow-md p-4">
      <div class="flex items-center justify-between">
        <button @click="router.back()" class="text-gray-600">
          <span class="text-xl">←</span>
        </button>
        <h1 class="text-lg font-medium">编辑个人资料</h1>
        <div class="w-8"></div>
      </div>
    </header>

    <!-- 表单内容 -->
    <div class="p-4">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 头像上传 -->
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img v-if="form.avatar" :src="form.avatar" alt="avatar" class="w-full h-full object-cover">
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
              class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2"
            >
              <span class="text-sm">✎</span>
            </button>
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="bg-white rounded-lg p-4 space-y-4">
          <div class="space-y-2">
            <label class="text-sm text-gray-600">昵称</label>
            <input
              v-model="form.nickname"
              type="text"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入昵称"
            >
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">性别</label>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input type="radio" v-model="form.gender" value="male" class="mr-2">
                男
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="form.gender" value="female" class="mr-2">
                女
              </label>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">生日</label>
            <input
              v-model="form.birthday"
              type="date"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">个人简介</label>
            <textarea
              v-model="form.bio"
              rows="3"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="介绍一下自己吧"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">手机号码</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入手机号码"
            >
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">邮箱</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入邮箱"
            >
          </div>
        </div>
      </form>
    </div>

    <!-- 底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
      <button
        @click="handleSubmit"
        class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
      >
        保存
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)

interface UserForm {
  avatar: string
  nickname: string
  gender: 'male' | 'female' | ''
  birthday: string
  bio: string
  phone: string
  email: string
}

const form = reactive<UserForm>({
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
  try {
    // 这里添加表单验证逻辑
    if (!form.nickname) {
      alert('请输入昵称')
      return
    }
    
    // 这里添加API调用逻辑
    console.log('提交的表单数据：', form)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 返回上一页
    router.back()
  } catch (error) {
    console.error('提交失败：', error)
    alert('保存失败，请重试')
  }
}
</script> 