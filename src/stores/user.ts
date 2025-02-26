import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'

interface UserState {
  userInfo: UserInfo
}

const defaultUserInfo: UserInfo = {
  avatar: '',
  nickname: '',
  gender: '',
  birthday: '',
  bio: '',
  phone: '',
  email: ''
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo') || JSON.stringify(defaultUserInfo))
  }),
  actions: {
    updateUserInfo(info: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...info }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    }
  }
}) 