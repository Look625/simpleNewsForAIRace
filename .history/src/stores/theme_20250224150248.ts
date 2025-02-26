import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark' | 'blue' | 'green'

interface ThemeState {
  currentTheme: Theme
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: (localStorage.getItem('theme') as Theme) || 'light'
  }),
  actions: {
    setTheme(theme: Theme) {
      this.currentTheme = theme
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }
}) 