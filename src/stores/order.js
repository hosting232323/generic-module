import { useShopStore } from '@/stores/shop';
import { defineStore, storeToRefs } from 'pinia';
import { useAddressStore } from '@/stores/address';

const shopStore = useShopStore();
const { products: shop } = storeToRefs(shopStore);

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: []
  }),
  actions: {
    addProduct(product) {
      const cartItem = this.products.find(item => {
        if (item.variant && product.variant)
          return item.product === product.product && item.variant === product.variant;

        return item.product === product.product;
      });

      let availableQuantity = Infinity;
      const el = shop.value.find(item => item.id == product.product);

      if(el?.quantity) availableQuantity = el.quantity;
      if(el?.variant && product.variant) {
        const variant = el.variant.find(v => v.id == product.variant.id);
        if (variant?.quantity) availableQuantity = variant.quantity;
      }
      
      if (cartItem) {
        if (cartItem.quantity >= availableQuantity) return false;
        cartItem.quantity += 1;
        return true;
      }
      this.products.push({ ...product, quantity: 1 });
      return true;
    },
    removeProduct(product) {
      const existingProduct = this.products.find(item => {
        if (item.variant && product.variant)
          return item.product === product.product && item.variant === product.variant;

        return item.product === product.product;
      });

      if (!existingProduct) return; 

      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        return;
      }

      this.products = this.products.filter(item => {
        if (item.variant && product.variant)
          return !(item.product === product.product && item.variant === product.variant);

        return !(item.product === product.product);
      });
    },
    removeAllProduct() {
      this.products = [];
      const addressStore = useAddressStore();
      addressStore.clearAll();
    }
  },
  persist: true
});
