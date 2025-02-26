import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/views/Video.vue'),
    meta: {
      title: '视频'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: '我的'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 