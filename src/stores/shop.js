import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [],
    ready: false
  }),
  actions: {
    initData(storeData, func) {
      if (storeData) {
        if (storeData.userId)
          this.initDataByUser(storeData.userId, func);
        else
          this.initDataFromJson(storeData, func);
      } else
        console.error('No store data found');
    },
    initDataByUser(data, func) {
      http.getRequest(`products/${data}`, {}, (res) => this.initDataFromJson(res.data, func));
    },
    initDataFromJson(products, func) {
      this.products = products;
      this.ready = true;
      func();
    }
  }
});
