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
    currentPost: emptyPost
  }),
  actions: {
    initData() {
      http.getRequestGenericBE('blog/post', {}, this.updatePosts);
    },
    updatePosts(data) {
      this.posts = data.posts || [];
    },
    resetCurrentPost() {
      this.currentPost = emptyPost;
    },
    editCurrentPost(post) {
      this.currentPost = post;
    }
  }
});
