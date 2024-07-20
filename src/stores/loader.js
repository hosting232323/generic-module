import http from '@/utils/http';
import { defineStore } from 'pinia';


export const useLoader = defineStore('loader', {
  state: () => ({
    loading: false
  }),
  actions: {
    updateLoader(loading) {
      this.loading = loading
    }
  }
});
