import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    ready: false
  }),
  actions: {
    initData(data) {
      if(Array.isArray(data)) this.setShopFromJson(data);
      else {
        http.getRequest(`blog/${data}`, {
          project: 'dorianadinanni.it'
        }, (res) => {
          this.posts = res.data.reverse();
        });
      }
    },
    setShopFromJson(posts) {
      this.posts = posts;
      this.ready = true;
    }
  }
});
