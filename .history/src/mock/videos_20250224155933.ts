export interface Video {
  id: number
  title: string
  cover: string
  duration: string
  views: string
  time: string
  category: string
  author: {
    name: string
    avatar: string
    followers: string
  }
  likes: string
  description: string
  tags: string[]
}

// 生成随机数据的辅助函数
const random = {
  between: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min),
  views: () => {
    const num = random.between(1, 100)
    return num > 10 ? `${num}万` : `${num * 1000}`
  },
  time: () => {
    const times = ['小时前', '天前', '周前', '个月前']
    return `${random.between(1, 24)}${times[random.between(0, 3)]}`
  },
  duration: () => {
    const minutes = random.between(1, 30)
    const seconds = random.between(0, 59)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
}

// 分类数据生成器
const generateVideos = (category: string, startId: number): Video[] => {
  return Array.from({ length: 30 }, (_, index) => ({
    id: startId + index,
    title: getCategoryTitle(category, index + 1),
    cover: `https://picsum.photos/400/225?random=${startId + index}`,
    duration: random.duration(),
    views: random.views(),
    time: random.time(),
    category,
    author: {
      name: getAuthorName(category),
      avatar: `https://picsum.photos/200/200?random=${startId + index}`,
      followers: `${random.between(1, 100)}万`
    },
    likes: random.views(),
    description: getCategoryDescription(category, index + 1),
    tags: getCategoryTags(category)
  }))
}

// 分类标题生成
const getCategoryTitle = (category: string, index: number): string => {
  const titles: Record<string, string[]> = {
    game: [
      '最新RPG游戏实况解说',
      '游戏攻略技巧分享',
      '电竞比赛精彩集锦',
      '独立游戏探索体验',
      '怀旧经典游戏回顾'
    ],
    music: [
      '新歌首发完整版',
      '音乐现场表演实录',
      '乐器演奏教学',
      '经典音乐改编',
      '音乐制作幕后'
    ],
    sports: [
      '体育赛事精彩回放',
      '运动技巧教学',
      '健身训练指导',
      '极限运动挑战',
      '体育明星专访'
    ],
    tech: [
      '最新科技产品评测',
      '编程开发教程',
      'AI技术应用展示',
      '数码产品使用技巧',
      '科技新闻深度解析'
    ],
    food: [
      '美食制作教程',
      '餐厅探店vlog',
      '传统美食文化',
      '甜点烘焙教学',
      '街边小吃探索'
    ],
    travel: [
      '旅行目的地攻略',
      '探险记录片',
      '美景航拍集锦',
      '特色民宿探访',
      '当地美食文化'
    ]
  }

  const baseTitle = titles[category][index % 5]
  return `${baseTitle} EP.${index} ${random.between(1000, 9999)}`
}

// 分类描述生成
const getCategoryDescription = (category: string, index: number): string => {
  const descriptions: Record<string, string[]> = {
    game: ['精彩的游戏实况，带你体验最新游戏', '详细的攻略解说，助你轻松通关'],
    music: ['优质音乐分享，治愈你的耳朵', '专业的音乐教学，提升你的演奏技巧'],
    sports: ['激情的体育赛事，精彩的比赛瞬间', '专业的运动指导，助你科学健身'],
    tech: ['最新科技资讯，紧跟科技潮流', '深度科技评测，理性消费选择'],
    food: ['美食制作教程，轻松学会烹饪', '寻找城市美食，分享舌尖上的享受'],
    travel: ['精彩的旅行记录，带你环游世界', '详细的攻略分享，助你畅游四方']
  }
  
  return descriptions[category][index % 2]
}

// 分类标签生成
const getCategoryTags = (category: string): string[] => {
  const tags: Record<string, string[]> = {
    game: ['游戏', '实况', '攻略', '电竞', 'RPG'],
    music: ['音乐', '演奏', '教学', 'MV', '现场'],
    sports: ['运动', '健身', '体育', '训练', '竞技'],
    tech: ['科技', '数码', '评测', '编程', 'AI'],
    food: ['美食', '烹饪', '探店', '甜点', '小吃'],
    travel: ['旅行', '探险', '攻略', '风景', '美食']
  }
  return tags[category]
}

// 获取作者名称
const getAuthorName = (category: string): string => {
  const names: Record<string, string[]> = {
    game: ['游戏达人', '电竞解说', '游戏玩家'],
    music: ['音乐人', '乐器演奏家', '音乐制作人'],
    sports: ['运动教练', '体育解说', '健身达人'],
    tech: ['科技评测', '数码博主', '技术专家'],
    food: ['美食家', '烹饪达人', '美食探店'],
    travel: ['旅行达人', '探险家', '旅游博主']
  }
  return names[category][random.between(0, 2)]
}

// 生成所有分类的视频数据
export const videoData: Record<string, Video[]> = {
  all: [],
  game: generateVideos('game', 1000),
  music: generateVideos('music', 2000),
  sports: generateVideos('sports', 3000),
  tech: generateVideos('tech', 4000),
  food: generateVideos('food', 5000),
  travel: generateVideos('travel', 6000)
}

// 生成推荐列表
videoData.all = [
  ...videoData.game.slice(0, 5),
  ...videoData.music.slice(0, 5),
  ...videoData.sports.slice(0, 5),
  ...videoData.tech.slice(0, 5),
  ...videoData.food.slice(0, 5),
  ...videoData.travel.slice(0, 5)
].sort(() => Math.random() - 0.5)

// 获取指定分类的视频数据
export const getVideosByCategory = (category: string): Video[] => {
  return videoData[category] || videoData.all
}

// 获取视频详情
export const getVideoById = (id: number): Video | undefined => {
  return Object.values(videoData)
    .flat()
    .find(video => video.id === id)
} 