import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    ready: false
  }),
  actions: {
    initData(storeData, func) {
      if (storeData) {
        if (storeData.project_name)
          this.initDataByUser(storeData.project_name, func)
        else
          this.initDataFromJson(storeData.content, func);
      } else
        console.error('No store data found');
    },
    initDataByUser(project_name) {
      http.getRequest(`blog`, {
        project: project_name
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
