import { defineStore } from 'pinia'

export type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'custom'
export type ThemeColors = {
  primary: string
  secondary: string
  background: string
  text: string
}

interface ThemeState {
  currentTheme: ThemeType
  customColors: ThemeColors
}

const defaultCustomColors: ThemeColors = {
  primary: '#3b82f6',
  secondary: '#60a5fa',
  background: '#ffffff',
  text: '#1f2937'
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: (localStorage.getItem('theme') as ThemeType) || 'light',
    customColors: JSON.parse(localStorage.getItem('customColors') || JSON.stringify(defaultCustomColors))
  }),
  actions: {
    setTheme(theme: ThemeType) {
      this.currentTheme = theme
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    },
    setCustomColors(colors: Partial<ThemeColors>) {
      this.customColors = { ...this.customColors, ...colors }
      localStorage.setItem('customColors', JSON.stringify(this.customColors))
      if (this.currentTheme === 'custom') {
        this.applyCustomColors()
      }
    },
    applyCustomColors() {
      const root = document.documentElement
      root.style.setProperty('--custom-primary', this.customColors.primary)
      root.style.setProperty('--custom-secondary', this.customColors.secondary)
      root.style.setProperty('--custom-background', this.customColors.background)
      root.style.setProperty('--custom-text', this.customColors.text)
    }
  }
}) 