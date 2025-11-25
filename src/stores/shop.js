import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [],
    ready: false,
    shipping_cost: 0,
    free_shipping_threshold: 0
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
        http.getRequest(`product/${data.projectName}/stripe`, {}, (res) => this.initDataFromJson(res, func));
      else
        http.getRequest(`product/${data.projectName}/db`, {}, (res) => this.initDataFromJson(res, func));
    },
    initDataFromJson(data, func) {
      this.products = data.data;
      this.ready = true;
      this.shipping_cost = data.shipping_cost;
      this.free_shipping_threshold = data.free_shipping_threshold;
      func();
    },
    placeOrder(projectName, products) {
      http.postRequest('payment/stripe-session', {
        project_name: projectName,
        products: products,
        from_db: true,
      }, function(data) {
        if (data.checkout_url)
          window.location.href = data.checkout_url;
        else if (data.status == 'ko')
          alert(data.message);
      })
    }
  }
});
