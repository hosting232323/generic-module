import http from '@/utils/http';
import { defineStore } from 'pinia';

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [],
    topics: [],
    enrichments: [],
    selectedTopic: null,
    showForm: false,
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
  getters: {
    filteredPosts: (state) => {
      if (!state.selectedTopic) {
        return state.posts;
      }
      if (state.selectedTopic === 'altri') {
        return state.posts.filter(post => !post.topics || post.topics.length === 0);
      }
      return state.posts.filter(post => post.topics && post.topics.includes(state.selectedTopic));
    }
  },
  actions: {
    initPosts(router) {
      http.getRequestGenericBE('blog/post', {
        project: localStorage.getItem('user_project')
      }, this.updatePosts, 'GET', router);
    },
    initEnrichments(router) {
      http.getRequestGenericBE('get-enrichment-types', {
        project: localStorage.getItem('user_project')
      }, this.updateEnrichments, 'GET', router);
    },
    initTopics(router) {
      http.getRequestGenericBE('blog/topic', {
        project: localStorage.getItem('user_project')
      }, this.updateTopics, 'GET', router);
    },
    updatePosts(data) {
      this.posts = data.posts || [];
    },
    updateTopics(data) {
      this.topics = data.topics || [];
    },
    updateEnrichments(data) {
      this.enrichments = data.enrichment_types || [];
    },
    clearCurrentPost() {
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
    resetCurrentPost() {
      const id = this.currentPost.id;
      this.currentPost = {
        id: id,
        title: '',
        content: '',
        subtitle: '',
        enrichment: {},
        topics: [],
        files: []
      }
    },
    editCurrentPost(post) {
      this.currentPost = JSON.parse(JSON.stringify(post));
      this.showForm = true; 
    },
    toggleForm(value) {
      this.showForm = value;
    },
    setSelectedTopic(topic) {
      this.selectedTopic = topic;
    }
  }
});
