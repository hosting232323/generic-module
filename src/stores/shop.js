import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop:genericFeStore', {
  state: () => ({
    products: [],
    ready: false,
    pickupInStore: false,
    shippingCost: undefined,
    freeShippingThreshold: undefined
  }),
  actions: {
    initData(storeData, func) {
      if (storeData) {
        if (storeData.projectName)
          this.initDataByProject(storeData, func);
        else
          this.formatData(storeData.products, func);
      } else
        console.error('No store data found');
    },
    initDataByProject(data, func) {
      if(data.stripeProduct)
        http.getRequest(`product/${data.projectName}/stripe`, {}, (res) => this.formatData(res.data, func));
      else
        http.getRequest(`product/${data.projectName}/db`, {}, (res) => this.formatData(
          res.data,
          func,
          res.shipping_cost,
          res.pickup_in_store,
          res.free_shipping_threshold
        ));
    },
    formatData(data, func, shippingCost = undefined, freeShippingThreshold = undefined, pickupInStore = undefined) {
      this.products = data;
      this.ready = true;
      this.shippingCost = shippingCost;
      this.pickupInStore = pickupInStore;
      this.freeShippingThreshold = freeShippingThreshold;
      func();
    },
    placeOrder(storeData, products, pickup = false) {
      http.postRequest('payment/stripe-session', {
        project_name: storeData.projectName,
        products: products,
        pickup: pickup,
        from_db: !storeData.stripeProduct
      }, function(data) {
        if (data.checkout_url)
          window.location.href = data.checkout_url;
        else if (data.status == 'ko')
          alert(data.message);
      })
    }
  }
});
