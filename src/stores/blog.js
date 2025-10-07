import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    ready: false
  }),
  actions: {
    initData(storeData, topicName, func) {
      console.log(topicName);
      if (storeData) {
        if (storeData.projectName)
          this.initDataByProject(storeData.projectName, topicName, func)
        else
          this.initDataFromJson(storeData.content, func);
      } else
        console.error('No store data found');
    },
    initDataByProject(projectName, topicName = null, func) {
      http.getRequest(`blog/post`, {
        project: projectName,
        topic: topicName
      }, (res) => this.initDataFromJson(res.posts.reverse(), func));
    },
    initDataFromJson(posts, func) {
      this.posts = posts;
      this.ready = true;
      func()
    }
  }
});
