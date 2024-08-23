import http from '@/utils/http';
import { defineStore } from 'pinia';

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
    topics: [],
    enrichments: [],
    currentPost: {
      id: null,
      title: '',
      content: '',
      subtitle: '',
      enrichment: {},
      topics: [],
      files: []
    }
  }),
  actions: {
    initPosts() {
      http.getRequestGenericBE('blog/post', {}, this.updatePosts);
    },
    initEnrichments() {
      http.getRequestGenericBE('get-enrichment-types', {}, this.updateEnrichments)
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
    updateEnrichments(data){
      this.enrichments = data.enrichment_types || [];
    },
    resetCurrentPost() {
      this.currentPost = {
        id: null,
        title: '',
        content: '',
        subtitle: '',
        enrichment: {},
        topics: [],
        files: []
      };
    },
    editCurrentPost(post) {
      this.currentPost = post;
    }
  }
});
