import http from '@/utils/http';
import { defineStore } from 'pinia';
import productionData from '@/productionData';
import { useRouter } from 'vue-router';

export const useChattyStore = defineStore('chatty:genericFeStore', {
  state: () => ({
    data: {},
    exportMode: false,
  }),
  actions: {
    initData(data) {
      this.data = data;
    }
  }
});
