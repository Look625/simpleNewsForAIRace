import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    videos: [],
    news: []
  }),
  actions: {
    setVideos(videos) {
      this.videos = videos;
    },
    setNews(news) {
      this.news = news;
    }
  }
}); 