import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: []
  }),
  actions: {
    initData(data) {
      if(Array.isArray(data)) this.setShopFromJson(data);
      else {
        http.getRequest(`products/${data}`, {}, (res) => {
          this.products = res;
        });
      }
    },
    setShopFromJson(products) {
      this.products = products;
    }
  }
});
