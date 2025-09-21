import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [],
    ready: false
  }),
  actions: {
    initDataByUser(data) {
      http.getRequest(`products/${data}`, {}, (res) => this.initDataFromJson(res.data));
    },
    initDataFromJson(products) {
      this.products = products;
      this.ready = true;
    }
  }
});
