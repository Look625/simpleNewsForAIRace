export interface Banner {
  id: number
  image: string
  title: string
  link: string
}

export interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  source: string
  time: string
  comments: number
  category: string
}

// 轮播图数据
export const banners: Banner[] = [
  {
    id: 1,
    image: 'https://picsum.photos/800/400?random=1',
    title: '科技创新引领未来：人工智能新突破',
    link: '/article/1'
  },
  {
    id: 2,
    image: 'https://picsum.photos/800/400?random=2',
    title: '体育盛事：世界杯精彩回顾',
    link: '/article/2'
  },
  {
    id: 3,
    image: 'https://picsum.photos/800/400?random=3',
    title: '财经动态：全球经济新趋势',
    link: '/article/3'
  }
]

// 生成随机新闻数据
const generateNewsItems = (category: string, count: number): NewsItem[] => {
  const newsItems: NewsItem[] = []
  for (let i = 0; i < count; i++) {
    newsItems.push({
      id: i + 1,
      title: `标题 ${i + 1} - ${category}`,
      description: `这是关于 ${category} 的描述内容，内容丰富多彩，值得一读。`,
      image: `https://picsum.photos/200/200?random=${i + 4}`,
      source: `${category} 来源`,
      time: `${Math.floor(Math.random() * 24)}小时前`,
      comments: Math.floor(Math.random() * 100),
      category: category
    })
  }
  return newsItems
}

// 新闻数据
export const newsData: Record<string, NewsItem[]> = {
  all: [
    ...generateNewsItems('all', 15) // 生成 15 条综合新闻
  ],
  
  tech: generateNewsItems('tech', 15), // 生成 15 条科技新闻
  entertainment: generateNewsItems('entertainment', 15), // 生成 15 条娱乐新闻
  sports: generateNewsItems('sports', 15), // 生成 15 条体育新闻
  finance: generateNewsItems('finance', 15), // 生成 15 条财经新闻
  lifestyle: generateNewsItems('lifestyle', 15) // 生成 15 条生活新闻
}

// 获取指定分类的新闻数据
export const getNewsByCategory = (category: string): NewsItem[] => {
  return newsData[category] || newsData.all
}

// 获取轮播图数据
export const getBanners = (): Banner[] => {
  return banners
} 