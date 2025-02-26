import { defineStore } from 'pinia'

export type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'custom'

export interface ThemeOption {
  label: string
  value: ThemeType
  bgClass: string
  active: boolean
  order: number
}

export type ThemeColors = {
  primary: string
  secondary: string
  background: string
  text: string
}

interface ThemeState {
  currentTheme: ThemeType
  customColors: ThemeColors
  themeOptions: ThemeOption[]
}

const defaultCustomColors: ThemeColors = {
  primary: '#3b82f6',
  secondary: '#60a5fa',
  background: '#ffffff',
  text: '#1f2937'
}

const defaultThemeOptions: ThemeOption[] = [
  { label: '浅色模式', value: 'light', bgClass: 'bg-white text-gray-800', active: true, order: 0 },
  { label: '深色模式', value: 'dark', bgClass: 'bg-gray-800 text-white', active: true, order: 1 },
  { label: '蓝色主题', value: 'blue', bgClass: 'bg-blue-500 text-white', active: true, order: 2 },
  { label: '绿色主题', value: 'green', bgClass: 'bg-green-500 text-white', active: true, order: 3 },
  { label: '自定义主题', value: 'custom', bgClass: 'theme-primary text-white', active: true, order: 4 }
]

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: (localStorage.getItem('theme') as ThemeType) || 'light',
    customColors: JSON.parse(localStorage.getItem('customColors') || JSON.stringify(defaultCustomColors)),
    themeOptions: JSON.parse(localStorage.getItem('themeOptions') || JSON.stringify(defaultThemeOptions))
  }),
  getters: {
    activeThemes: (state) => {
      return state.themeOptions
        .filter(theme => theme.active)
        .sort((a, b) => a.order - b.order)
        .slice(0, 5)
    }
  },
  actions: {
    setTheme(theme: ThemeType) {
      this.currentTheme = theme
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)

      // 应用主题颜色
      if (theme === 'light') {
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-primary', '#1f2937');
      } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--bg-primary', '#1f2937');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
      } else if (theme === 'blue') {
        document.documentElement.style.setProperty('--bg-primary', '#3b82f6');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
      } else if (theme === 'green') {
        document.documentElement.style.setProperty('--bg-primary', '#22c55e');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
      }
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
    },
    updateThemeOptions(options: ThemeOption[]) {
      this.themeOptions = options
      localStorage.setItem('themeOptions', JSON.stringify(options))
    },
    toggleTheme(value: ThemeType) {
      const theme = this.themeOptions.find(t => t.value === value)
      if (theme) {
        theme.active = !theme.active
        localStorage.setItem('themeOptions', JSON.stringify(this.themeOptions))
      }
    },
    reorderThemes(fromIndex: number, toIndex: number) {
      const themes = [...this.themeOptions]
      const [removed] = themes.splice(fromIndex, 1)
      themes.splice(toIndex, 0, removed)
      themes.forEach((theme, index) => {
        theme.order = index
      })
      this.themeOptions = themes
      localStorage.setItem('themeOptions', JSON.stringify(themes))
    }
  }
}) 