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
    <v-card class="mt-4" :style="{ width: isMobile ? '100%' : '400px', backgroundColor: '#f5f5f5' }">
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
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img :src="getImageForProduct(product.product)" alt="product image" width="70" max-width="70" class="mr-3" />
                </v-col>
                <v-col cols="6">
                  <p style="font-size: 16px; font-weight: bold; padding-right: 10px;">{{ getText(getProductName(product.product)) }}</p>
                  <p v-if="product.variant" style="font-size: 13px; padding-right: 10px;">Taglia: {{ product.variant.name }}</p>
                  <div style="display: flex; align-items: center;">
                    <p class="text-caption">{{ getText(store.content?.amount) || 'Quantità' }}:</p>
                    <v-btn @click.stop="decreaseQuantity(product)" icon="mdi-minus" size="x-small" style="margin: 0 5px; box-shadow: none;"/>
                    {{ product.quantity }}
                    <v-btn @click.stop="increaseQuantity(product)" icon="mdi-plus" size="x-small" style="margin: 0 0 0 5px; box-shadow: none;"/>
                  </div>
                </v-col>
                <v-col cols="2">
                  <p style="font-size: 15px; font-weight: bold; width: max-content;" v-html="getPrice(product)"></p>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </template>
      </v-card-text>
      <v-card-subtitle class="text-right" style="font-size: 16px; font-weight: normal; padding-right: 16px;" v-if="!isCheckout">
        {{ getText(store.content?.shipping) || 'Spedizione' }}: 
        <span v-if="shippingPrice === 0">{{ getText(store.content?.freeShipping) || 'Gratuita' }}</span>
        <span v-else>{{ shippingPrice.toFixed(2) }} €</span>
      </v-card-subtitle>
      <v-card-subtitle class="text-right" style="font-size: 18px; font-weight: bold; padding-right: 16px;" v-if="!isCheckout">
        {{ getText(store.content?.totalPrice) || 'Prezzo Totale' }}: {{ totalPrice }}
      </v-card-subtitle>
      <v-card-actions :class="[isMobile ? 'd-flex flex-column align-start' : '']" :style="{gap: isMobile ? '0' : '0.5rem'}">
        <v-btn @click="isCheckout ? placeOrder() : proceedToCheckout()" color="primary">
          {{ isCheckout ? (getText(store.content?.sendOrder) || 'Invia Ordine') : (getText(store.content?.proceedCheckout) || 'Procedi al Checkout') }}
        </v-btn>
          <v-btn @click="isCheckout ? isCheckout = false : clearCart()" color="error">
          {{ isCheckout ? (getText(store.content?.goBack) || 'Torna Indietro') : (getText(store.content?.emptyCart) || 'Svuota Carrello') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import Address from './Address';

import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { usePopupStore } from '@/stores/popup';
import { setupMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const productPrices = ref({});
const isCheckout = ref(false);
const isMenuVisible = ref(false);
const shopStore = useShopStore();
const dataStore = useDataStore();
const popupStore = usePopupStore();
const orderStore = useOrderStore();
const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();

const { data } = storeToRefs(dataStore);
const { products, shippingCost, freeShippingThreshold } = storeToRefs(shopStore);
const store = data.value.store;

const totalItems = computed(() => {
  return validCartProducts.value.reduce((total, product) => total + product.quantity, 0);
});

const totalPrice = computed(() => {
  const totalProducts = validCartProducts.value.reduce((total, product) => {
    const price = getProductPrice(product.product); 
    return total + (price * product.quantity); 
  }, 0);

  const shipping = shippingPrice.value;
  return (totalProducts + shipping).toFixed(2) + ' €'; 
});

const shippingPrice = computed(() => {
  const total = validCartProducts.value.reduce((sum, product) => {
    const price = getProductPrice(product.product);
    return sum + price * product.quantity;
  }, 0);
  if (total >= (freeShippingThreshold.value / 100)) return 0;
  return (shippingCost.value / 100) || 0;
});

const proceedToCheckout = async () => {
  if (!store.addressMode)
    await placeOrder();
  else
    isCheckout.value = true;
};

const placeOrder = async () => {
  const { products } = storeToRefs(orderStore);
  shopStore.placeOrder(store.projectName, products.value);
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
  if (productNames.value[productId])
    return productNames.value[productId];

  return 'Caricamento...';
};

const getProductQuantity = (productId) => {
  return products.value.find(p => p.id === productId).quantity;
};

const getProductPrice = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (!product) return 'Prodotto non disponibile';

  let price;
  if(product.discount)
    price = product.discount
  else
    price = product.price
  productPrices.value[productId] = parseFloat(price) / 100;
  if (productPrices.value[productId])
    return productPrices.value[productId];

  return 0;
};

const getPrice = (prod) => {
  const product = products.value.find(p => p.id === prod.product);
  if(product.discount)
    return `${parseFloat((product.discount) / 100).toFixed(2)} €`;
  else if (product.price)
    return parseFloat((product.price) / 100).toFixed(2) + ' €';
  else
    return 'Non disponibile';
}

const increaseQuantity = (product) => {
  const cartItem = orderStore.products.find(p => p.product === product.product);
  const availableQuantity = getProductQuantity(product.product);
  if (availableQuantity && cartItem.quantity < availableQuantity)
    orderStore.addProduct(product);
  else 
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

watch(() => shippingPrice.value, (newShipping) => {
  const existing = orderStore.products.find(p => p.product === 'shipping');
  if (newShipping === 0) {
    if (existing) {
      orderStore.products = orderStore.products.filter(p => p.product !== 'shipping');
    }
  } else {
    if (existing) {
      existing.price = newShipping * 100;
    } else {
      orderStore.products.push({
        product: 'shipping',
        name: 'Spedizione',
        quantity: 1,
        price: newShipping * 100,
      });
    }
  }
},{ immediate: true });
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
