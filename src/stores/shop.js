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
        if (storeData.projectName)
          this.initDataByProject(storeData.projectName, func);
        else
          this.initDataFromJson(storeData.products, func);
      } else
        console.error('No store data found');
    },
    initDataByProject(data, func) {
      http.getRequest(`payment/${data}`, {}, (res) => this.initDataFromJson(res.data, func));
    },
    initDataFromJson(products, func) {
      this.products = products;
      this.ready = true;
      func();
    }
  }
});
