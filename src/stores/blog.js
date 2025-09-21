import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    ready: false
  }),
  actions: {
    initDataByUser(data) {
      http.getRequest(`blog/${data}`, {
        project: 'dorianadinanni.it'
      }, (res) => this.initDataFromJson(res.data.reverse()));
    },
    initDataFromJson(posts) {
      this.posts = posts;
      this.ready = true;
    }
  }
});
