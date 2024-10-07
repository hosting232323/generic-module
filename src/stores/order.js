import http from '@/utils/http';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: []
  }),
  actions: {
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(product) {
      this.products.remove(product);
    },
    submitOrders() {
    //   prendere  business 
      http.postRequestBrooking('api/shop/order/', {
        business_activity: 1,
        items: this.products
      }, this.removeAllProduct);
    },
    removeAllProduct() {
      this.products = [];
    }
  }
});
