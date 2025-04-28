import http from '@/utils/http';
import { defineStore } from 'pinia';
import { useAddressStore } from '@/stores/address';

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: []
  }),
  actions: {
    addProduct(product) {
      const existingProduct = this.products.find(item => item.product === product.product);
      if (existingProduct) existingProduct.quantity += 1;
      else {
        product.quantity = 1;
        this.products.push(product);
      }
    },
    removeProduct(product) {
      const existingProduct = this.products.find(item => item.product === product.product);
      if (existingProduct) {
        if (existingProduct.quantity > 1) existingProduct.quantity -= 1;
        else this.products = this.products.filter(item => item.product !== product.product);
      }
    },
    submitOrders(businessActivity) {
      const addressStore = useAddressStore();
      const fullAddress = addressStore.getFullAddress();

      if (fullAddress === false) {
        throw new Error('Indirizzo non completo.');
      }

      http.postRequestBrooking('api/shop/order/', {
        business_activity: businessActivity,
        items: this.products,
        service: 36,
        note: fullAddress
      }, this.removeAllProduct, 'POST', false);
  
      this.removeAllProduct();
    },
    removeAllProduct() {
      this.products = [];
      const addressStore = useAddressStore();
      addressStore.clearAll();
    }
  },
  persist: true
});
