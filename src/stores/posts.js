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
    enrichmentTypes: [],
    currentPost: {
      id: null,
      title: '',
      content: '',
      subtitle: '',
      enrichment: '',
      topics: [],
      files: []
    }
  }),
  actions: {
    initPosts() {
      http.getRequestGenericBE('blog/post', {}, this.updatePosts);
    },
    initEnrichmentTypes() {
      http.getRequestGenericBE('get-enrichment-types', {}, this.updateEnrichmentTypes)
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
    updateEnrichmentTypes(data){
      this.enrichmentTypes = data.enrichment_types || [];
    },
    resetCurrentPost() {
      this.currentPost = emptyPost;
    },
    editCurrentPost(post) {
      this.currentPost = post;
    }
  }
});
