import { defineStore } from 'pinia';
import { useAddressStore } from '@/stores/address';

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: []
  }),
  actions: {
    addProduct(product) {
      const existingProduct = this.products.find(item => {
        if (item.variant && product.variant) {
          return item.product === product.product && item.variant === product.variant;
        } 
        return item.product === product.product;
      });
      if (existingProduct) existingProduct.quantity += 1;
      else {
        product.quantity = 1;
        this.products.push(product);
      }
    },
    removeProduct(product) {
      const existingProduct = this.products.find(item => {
        if (item.variant && product.variant) {
          return item.product === product.product && item.variant === product.variant;
        }
        return item.product === product.product
      });

      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        this.products = this.products.filter(item => {
          if (item.variant && product.variant) {
            return !(item.product === product.product && item.variant === product.variant);
          }
          return !(item.product === product.product);
        });
      }
    },
    removeAllProduct() {
      this.products = [];
      const addressStore = useAddressStore();
      addressStore.clearAll();
    }
  },
  persist: true
});
