import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    ready: false
  }),
  actions: {
    initDat(storeData, func) {
      if (storeData)
        this.initDataFromJson(storeData, func);
    },
    initDataByUser(data) {
      http.getRequest(`blog/${data}`, {
        project: 'dorianadinanni.it'
      }, (res) => this.initDataFromJson(res.data.reverse()));
    },
    initDataFromJson(posts, func) {
      this.posts = posts;
      this.ready = true;
      func()
    }
  },
  persist: true
});
