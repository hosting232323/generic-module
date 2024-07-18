import http from '@/utils/http';
import { defineStore } from 'pinia';

const emptyPost = {
  id: null,
  title: '',
  content: '',
  subtitle: '',
  enrichment: '',
  topics: [],
  files: []
};

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
    topics: [],
    currentPost: emptyPost
  }),
  actions: {
    initPosts() {
      http.getRequestGenericBE('blog/post', {}, this.updatePosts);
    },
    initTopics() {
      http.getRequestGenericBE('blog/topic', {}, this.updateTopics);
    },
    updatePosts(data) {
      this.posts = data.posts || [];
    },
    updateTopics(data) {
      this.topics = data.topics || [];
    },
    resetCurrentPost() {
      this.currentPost = emptyPost;
    },
    editCurrentPost(post) {
      this.currentPost = post;
    }
  }
});
