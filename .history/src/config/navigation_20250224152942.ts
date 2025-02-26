import type { Component } from 'vue'

export interface NavItem {
  path: string
  label: string
  icon: Component
  activeIcon: Component
}

export const navItems: NavItem[] = [
  {
    path: '/',
    label: '首页',
    icon: markRaw(defineComponent({
      render: () => h('svg', {
        class: 'w-6 h-6',
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        })
      ])
    })),
    activeIcon: markRaw(defineComponent({
      render: () => h('svg', {
        class: 'w-6 h-6',
        fill: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', {
          d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        })
      ])
    }))
  },
  {
    path: '/video',
    label: '视频',
    icon: markRaw(defineComponent({
      render: () => h('svg', {
        class: 'w-6 h-6',
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
        })
      ])
    })),
    activeIcon: markRaw(defineComponent({
      render: () => h('svg', {
        class: 'w-6 h-6',
        fill: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', {
          d: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
        })
      ])
    }))
  },
  {
    path: '/profile',
    label: '我的',
    icon: markRaw(defineComponent({
      render: () => h('svg', {
        class: 'w-6 h-6',
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        })
      ])
    })),
    activeIcon: markRaw(defineComponent({
      render: () => h('svg', {
        class: 'w-6 h-6',
        fill: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', {
          d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        })
      ])
    }))
  }
] 