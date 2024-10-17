import http from '@/utils/http';
import { defineStore } from 'pinia';

import { useAddressStore } from '@/stores/address';
const addressStore = useAddressStore();

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('orderProducts')) || []
  }),
  actions: {
    addProduct(product) {
      const existingProduct = this.products.find(item => item.product === product.product);
      if (existingProduct) existingProduct.quantity += 1;
      else {
        product.quantity = 1;
        this.products.push(product);
      }
      this.saveProductsToSession();
    },
    removeProduct(product) {
      const existingProduct = this.products.find(item => item.product === product.product);
      if (existingProduct) {
        if (existingProduct.quantity > 1) existingProduct.quantity -= 1;
        else this.products = this.products.filter(item => item.product !== product.product);
      }
      this.saveProductsToSession();
    },
    submitOrders(businessActivity) {
      const fullAddress = addressStore.getFullAddress();

      if (fullAddress === false) {
        throw new Error;
      }

      http.postRequestBrooking('api/shop/order/', {
        business_activity: businessActivity,
        items: this.products,
        service: 36,
        note: fullAddress
      }, this.removeAllProduct, 'POST', false);
  
      localStorage.removeItem('orderProducts');
    },
    removeAllProduct() {
      this.products = [];
      addressStore.clearAll();
      this.saveProductsToSession();
    },
    saveProductsToSession() {
      localStorage.setItem('orderProducts', JSON.stringify(this.products));
    }
  }
});
