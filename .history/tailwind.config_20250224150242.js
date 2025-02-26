/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 定义主题颜色
        primary: {
          light: '#ffffff',
          dark: '#1a1a1a',
          blue: '#3b82f6',
          green: '#22c55e'
        }
      }
    },
  },
  plugins: [],
} 