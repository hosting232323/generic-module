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
        if (storeData.projectName)
          this.initDataByProject(storeData.projectName, func);
        else
          this.initDataFromJson(storeData.content, func);
      } else
        console.error('No store data found');
    },
    initDataByProject(projectName, func) {
      http.getRequest(`blog/post`, {
        project: projectName
      }, (res) => this.initDataFromJson(res.posts.reverse(), func));
    },
    initDataFromJson(posts, func) {
      this.posts = posts;
      this.ready = true;
      func();
    }
  }
});
