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
          this.initDataByProject(storeData, func);
        else
          this.initDataFromJson(storeData.products, func);
      } else
        console.error('No store data found');
    },
    initDataByProject(data, func) {
      if(data.stripeProduct)
        http.getRequest(`product/${data.projectName}/stripe`, {}, (res) => this.initDataFromJson(res.data, func));
      else
        http.getRequest(`product/${data.projectName}/db`, {}, (res) => this.initDataFromJson(res.data, func));
    },
    initDataFromJson(products, func) {
      this.products = products;
      this.ready = true;
      func();
    },
    placeOrder(projectName, products) {
      http.postRequest('payment/stripe-session', {
        project_name: projectName,
        products: products
      }, function(data) {
        if (data.checkout_url)
          window.location.href = data.checkout_url;
        else if (data.status == 'ko')
          alert(data.message);
      })
    }
  }
});
