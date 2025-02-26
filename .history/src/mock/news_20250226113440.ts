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

// 生成随机标题的函数
const generateRandomTitle = () => {
    const titles = [
        "科技巨头发布新产品",
        "全球经济面临挑战",
        "新研究揭示健康饮食的重要性",
        "运动员在比赛中创下新纪录",
        "气候变化对未来的影响",
        "新兴市场的投资机会",
        "人工智能的未来发展",
        "太空探索的新发现",
        "社交媒体对青少年的影响",
        "新冠疫情后的世界"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
};

// 生成随机内容的函数
const generateRandomContent = () => {
    const contents = [
        "在最近的发布会上，科技巨头展示了他们最新的创新产品，吸引了众多媒体的关注。",
        "经济学家警告，全球经济可能面临新的挑战，呼吁各国采取措施应对。",
        "一项新的研究表明，健康饮食对提高生活质量至关重要，专家建议人们多吃水果和蔬菜。",
        "在最近的比赛中，一位运动员打破了世界纪录，成为新的冠军。",
        "气候变化的影响日益明显，科学家们呼吁采取紧急行动以保护地球。",
        "投资者正在关注新兴市场的机会，分析师认为这些市场将迎来快速增长。",
        "人工智能技术正在迅速发展，未来可能会改变我们的生活方式。",
        "最近的太空探索任务带来了新的发现，科学家们对宇宙的理解又向前迈进了一步。",
        "社交媒体的普及对青少年的心理健康产生了深远的影响，专家们对此表示担忧。",
        "随着新冠疫情的缓解，世界各国正在努力恢复经济和社会活动。"
    ];
    return contents[Math.floor(Math.random() * contents.length)];
};

// 生成新闻列表
const generateNewsList = (count: number): NewsItem[] => {
    const newsList: NewsItem[] = [];
    for (let i = 0; i < count; i++) {
        newsList.push({
            id: i + 1,
            title: generateRandomTitle(),
            description: generateRandomContent(),
            image: `https://picsum.photos/200/200?random=${i + 4}`,
            source: '来源未知',
            time: `${Math.floor(Math.random() * 24)}小时前`,
            comments: Math.floor(Math.random() * 100),
            category: '综合'
        });
    }
    return newsList;
};
console.log(generateNewsList(10))
// 导出生成的新闻数据
const newsData = generateNewsList(10); // 生成10条新闻
export default newsData;

// 获取指定分类的新闻数据
export const getNewsByCategory = (category: string): NewsItem[] => {
  return newsData.filter(item => item.category === category) || newsData;
}

// 获取轮播图数据
export const getBanners = (): Banner[] => {
  return banners
} 