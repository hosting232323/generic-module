/* eslint-disable no-console */

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
        http.getRequest(`shop/stripe-product`, {
          project: data.projectName
        }, (res) => this.formatData(res.data, func));
      else
        http.getRequest(`shop/db-product`, {
          project: data.projectName
        }, (res) => this.formatData(
          res.data,
          func,
          res.shipping_cost,
          res.pickup_in_store,
          res.free_shipping_threshold
        ));
    },
    formatData(data, func, shippingCost = 0, pickupInStore = false, freeShippingThreshold = 0) {
      this.products = data;
      this.ready = true;
      this.shippingCost = shippingCost;
      this.pickupInStore = pickupInStore;
      this.freeShippingThreshold = freeShippingThreshold;
      func();
    },
    placeOrder(storeData, products, pickup = false) {
      http.postRequest('shop/stripe-session', {
        project_name: storeData.projectName,
        products: products,
        pickup: pickup,
        from_db: !storeData.stripeProduct
      }, function(data) {
        if (data.checkout_url)
          window.location.href = data.checkout_url;
        else if (data.status == 'ko')
          alert(data.message);
      });
    }
  }
});
