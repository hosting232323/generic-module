import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [],
    ready: false
  }),
  actions: {
    initData(data) {
      if(Array.isArray(data)) this.setShopFromJson(data);
      else {
        http.getRequest(`products/${data}`, {}, (res) => {
          this.products = res;
          this.ready = true;
        });
      }
    },
    setShopFromJson(products) {
      this.products = products;
      this.ready = true;
    }
  }
});
