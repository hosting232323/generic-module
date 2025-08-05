import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: []
  }),
  actions: {
    initData(userId) {
      http.getRequest(`products/${userId}`, {}, (data) => {
        this.products = data;
      });
    }
  },
  persist: true
});
