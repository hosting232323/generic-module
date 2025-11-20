<template>
  <v-menu 
    v-model="isMenuVisible" 
    transition="scale-transition" 
    :close-on-content-click="false"
    @click:outside="isMenuVisible = false" 
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" v-if="isMobile">
        <v-icon icon="mdi-cart-outline"></v-icon>
        ({{ totalItems }})
      </v-btn>
      <v-btn v-bind="props" v-if="!isMobile">
        <v-icon icon="mdi-cart-outline" start></v-icon>
        <p>{{ getText(store.content?.name) || 'Carrello' }} ({{ totalItems }})</p>
      </v-btn>
    </template>

    <v-card class="mt-4" style="width: 400px; background-color: #f5f5f5;">
      <v-card-title>
        <span class="font-weight-bold">{{ isCheckout ? (getText(store.content?.shippingAddress) || 'Indirizzo di Spedizione') : (getText(store.content?.orderSummary) || 'Riepilogo Ordini') }}</span>
      </v-card-title>

      <v-card-text>
        <template v-if="isCheckout">
          <Address />
        </template>
        <template v-else>
          <v-list>
            <v-list-item v-for="product in validCartProducts" class="py-4">
              <v-row align="center" style="width: 100%;">
                <v-col class="d-flex align-center">
                  <v-img :src="getImageForProduct(product.product)" alt="product image" width="40" class="mr-3" />
                  
                  <div style="flex-grow: 1;">
                    <p style="font-size: 16px; font-weight: bold;">{{ getText(getProductName(product.product)) }}</p>
                    <div style="display: flex; align-items: center;">
                      <p class="text-caption">{{ getText(store.content?.amount) || 'Quantità' }}:</p>
                      <v-btn @click.stop="decreaseQuantity(product)" icon="mdi-minus" size="x-small" style="margin: 0 5px; box-shadow: none;"/>
                      {{ product.quantity }}
                      <v-btn @click.stop="increaseQuantity(product)" icon="mdi-plus" size="x-small" style="margin: 0 0 0 5px; box-shadow: none;"/>
                    </div>
                  </div>
                  
                  <p style="font-size: 15px; font-weight: bold;">{{ getProductPrice(product.product) + ' €'}}</p>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </template>
      </v-card-text>

      <v-card-subtitle class="text-right" style="font-size: 18px; font-weight: bold; padding-right: 16px;" v-if="!isCheckout">
        {{ getText(store.content?.totalPrice) || 'Prezzo Totale' }}: {{ totalPrice }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="isCheckout ? placeOrder() : proceedToCheckout()" color="primary">
          {{ isCheckout ? (getText(store.content?.sendOrder) || 'Invia Ordine') : (getText(store.content?.proceedCheckout) || 'Procedi al Checkout') }}
        </v-btn>
        <v-btn @click="isCheckout ? cancelCheckout() : clearCart()" color="error">
          {{ isCheckout ? (getText(store.content?.goBack) || 'Torna Indietro') : (getText(store.content?.emptyCart) || 'Svuota Carrello') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import Address from './Address';

import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { usePopupStore } from '@/stores/popup';
import { setupMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const shopStore = useShopStore();
const popupStore = usePopupStore();
const orderStore = useOrderStore();
const { getText } = useLanguageStore();

const isCheckout = ref(false);
const isMenuVisible = ref(false);
const isMobile = setupMobileUtils();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const { products } = storeToRefs(shopStore);
const store = data.value.store;

const totalItems = computed(() => {
  return validCartProducts.value.reduce((total, product) => total + product.quantity, 0);
});

const totalPrice = computed(() => {
  return validCartProducts.value.reduce((total, product) => {
    const price = getProductPrice(product.product); 
    return total + (price * product.quantity); 
  }, 0).toFixed(2) + ' €'; 
});

const proceedToCheckout = async () => {
  if (!store.addressMode) {
    await placeOrder();
  } else {
    isCheckout.value = true;
  }
};

const placeOrder = async () => {
  const { products } = storeToRefs(orderStore);
  shopStore.placeOrder(store.projectName, products.value);
};

const cancelCheckout = () => {
  isCheckout.value = false;
};

const clearCart = () => {
  try {
    orderStore.removeAllProduct();
    popupStore.setPopup('Carrello svuotato correttamente!', 'success');
  } catch (error) {
    popupStore.setPopup('Impossibile svuotare il carrello!', 'error');
  }
};

const productNames = ref({});
const getProductName = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (!product) return 'Prodotto non disponibile';
  productNames.value[productId] = product.name;

  if (productNames.value[productId]) {
    const name = productNames.value[productId];
    if (name.length > 18) {
      const truncatedName = name.slice(0, 19); 
      return truncatedName.endsWith(' ') ? truncatedName.trimEnd() + '...' : truncatedName + '...';
    }
    return name;
  }
  return 'Caricamento...';
};

const getProductQuantity = (productId) => {
  return products.value.find(p => p.id === productId).quantity;
};

const productPrices = ref({});
const getProductPrice = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (!product) return 'Prodotto non disponibile';
  const price = product.price
  productPrices.value[productId] = parseFloat(price) / 100;

  if (productPrices.value[productId])
    return productPrices.value[productId];
  return 0;
};

const increaseQuantity = (product) => {
  const cartItem = orderStore.products.find(p => p.product === product.product);
  const availableQuantity = getProductQuantity(product.product);
  if (cartItem.quantity < availableQuantity)
    orderStore.addProduct(product);
};

const decreaseQuantity = (product) => {
  orderStore.removeProduct(product);
};

const getImageForProduct = (productId) => {
  const product = products.value.find(product => product.id == productId);
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const validCartProducts = computed(() => {
  return orderStore.products.filter(cartItem => 
    products.value.some(product => product.id === cartItem.product)
  );
});
</script>

<style scoped>
.v-card-title {
  font-size: 18px;
  color: #000;
}

.v-btn {
  border-radius: 10px;
}

.v-card {
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-list-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
