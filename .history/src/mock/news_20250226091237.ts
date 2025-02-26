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

// 新闻数据
export const newsData: Record<string, NewsItem[]> = {
  all: [
    {
      id: 1,
      title: '重磅：最新科技突破引领行业变革',
      description: '最新研究显示，量子计算领域取得重大突破，将为未来技术发展带来革命性变化。',
      image: 'https://picsum.photos/200/200?random=4',
      source: '科技日报',
      time: '2小时前',
      comments: 128,
      category: 'tech'
    },
    {
      id: 2,
      title: '体育：世界杯决赛精彩回顾',
      description: '精彩的比赛过程，扣人心弦的对决，见证历史性时刻。',
      image: 'https://picsum.photos/200/200?random=5',
      source: '体育周刊',
      time: '4小时前',
      comments: 256,
      category: 'sports'
    },
    // ... 更多推荐新闻
  ],
  
  tech: [
    {
      id: 101,
      title: 'AI革新：新一代人工智能技术发布',
      description: '突破性的AI技术将改变我们的生活方式，为各行各业带来新的机遇。',
      image: 'https://picsum.photos/200/200?random=6',
      source: '科技前沿',
      time: '1小时前',
      comments: 156,
      category: 'tech'
    },
    {
      id: 102,
      title: '5G技术应用新进展',
      description: '5G技术在智慧城市建设中的最新应用案例和成果展示。',
      image: 'https://picsum.photos/200/200?random=7',
      source: '通信技术报',
      time: '3小时前',
      comments: 67,
      category: 'tech'
    },
    // ... 更多科技新闻
  ],

  entertainment: [
    {
      id: 201,
      title: '娱乐圈最新动态：明星八卦',
      description: '最新娱乐新闻，带你了解明星的生活。',
      image: 'https://picsum.photos/200/200?random=7',
      source: '娱乐周刊',
      time: '3小时前',
      comments: 45,
      category: 'entertainment'
    },
    {
      id: 202,
      title: '流行音乐盛典举行',
      description: '各大音乐人齐聚一堂，展现音乐的无限魅力和创新精神。',
      image: 'https://picsum.photos/200/200?random=9',
      source: '音乐时代',
      time: '6小时前',
      comments: 231,
      category: 'entertainment'
    },
    // ... 更多娱乐新闻
  ],

  sports: [
    {
      id: 301,
      title: '奥运会筹备工作进展顺利',
      description: '各项基础设施建设和赛事准备工作都在有序推进中。',
      image: 'https://picsum.photos/200/200?random=10',
      source: '体育新闻',
      time: '1小时前',
      comments: 156,
      category: 'sports'
    },
    {
      id: 302,
      title: 'NBA季后赛激战正酣',
      description: '精彩的比赛让球迷大呼过瘾，多支球队展现出冠军相。',
      image: 'https://picsum.photos/200/200?random=11',
      source: '篮球时报',
      time: '2小时前',
      comments: 289,
      category: 'sports'
    },
    // ... 更多体育新闻
  ],

  finance: [
    {
      id: 401,
      title: '全球股市创新高',
      description: '多个主要市场指数突破历史新高，投资者信心增强。',
      image: 'https://picsum.photos/200/200?random=9',
      source: '财经日报',
      time: '30分钟前',
      comments: 167,
      category: 'finance'
    },
    {
      id: 402,
      title: '数字货币发展新动向',
      description: '各国央行数字货币研发进程加快，未来支付方式将发生重大变革。',
      image: 'https://picsum.photos/200/200?random=13',
      source: '金融时报',
      time: '1小时前',
      comments: 145,
      category: 'finance'
    },
    // ... 更多财经新闻
  ],

  lifestyle: [
    {
      id: 501,
      title: '健康饮食新趋势',
      description: '专家解读最新饮食理念，为健康生活提供专业指导。',
      image: 'https://picsum.photos/200/200?random=10',
      source: '生活周刊',
      time: '2小时前',
      comments: 78,
      category: 'lifestyle'
    },
    {
      id: 502,
      title: '居家办公环境布置技巧',
      description: '如何打造一个舒适高效的居家办公环境，提升工作效率。',
      image: 'https://picsum.photos/200/200?random=15',
      source: '家居杂志',
      time: '3小时前',
      comments: 92,
      category: 'lifestyle'
    },
    // ... 更多生活新闻
  ]
}

// 获取指定分类的新闻数据
export const getNewsByCategory = (category: string): NewsItem[] => {
  return newsData[category] || newsData.all
}

// 获取轮播图数据
export const getBanners = (): Banner[] => {
  return banners
} 