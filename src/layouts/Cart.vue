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
        Carrello ({{ totalItems }})
      </v-btn>
    </template>

    <v-card class="mt-4" style="width: 400px; background-color: #f5f5f5;">
      <v-card-title>
        <span class="font-weight-bold">Riepilogo Ordini</span>
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item v-for="(product, index) in orderStore.products" :key="product.id" class="py-4">
            <v-row align="center" style="width: 100%;">
              <v-col class="d-flex align-center">
                <v-img :src="getImageForProduct()" alt="product image" width="40" class="mr-3" />
                
                <div style="flex-grow: 1;">
                  <p style="font-size: 16px; font-weight: bold;">{{ getProductName(product.product) }}</p>
                  <div style="display: flex; align-items: center;">
                    <p class="text-caption">Quantità:</p>
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
      </v-card-text>

      <v-card-subtitle class="text-right" style="font-size: 18px; font-weight: bold; padding-right: 16px;">
        Prezzo Totale: {{ totalPrice }}
      </v-card-subtitle>

      <input type="text">

      <v-card-actions>
        <v-btn @click="placeOrder" color="primary">Invia Ordine</v-btn>
        <v-btn @click="clearCart" color="error">Svuota Carrello</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/order';
import http from '@/utils/http';
import { useDataStore } from '@/stores/data';
import mobile from '@/utils/mobile';

import { usePopupStore } from '@/stores/popup';
const popupStore = usePopupStore();

const isMobile = mobile.setupMobileUtils();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const store = data.value.store;

const orderStore = useOrderStore();
const isMenuVisible = ref(false);

const productNames = ref({});
const productPrices = ref({});

const getProductName = (productId) => {
  if (productNames.value[productId]) {
    const name = productNames.value[productId];
    if (name.length > 18) {
      const truncatedName = name.slice(0, 19); 
      return truncatedName.endsWith(' ') ? truncatedName.trimEnd() + '...' : truncatedName + '...';
    }
    return name;
  }
  
  http.getRequestBrooking(`api/shop/product/${store.businessActivity}/${productId}/`, {}, function (data) {
    productNames.value[productId] = data.name; 
  }, true);
  
  return 'Caricamento...';
};

const getProductPrice = (productId) => {
  if (productPrices.value[productId]) {
    return productPrices.value[productId];
  }
  http.getRequestBrooking(`api/shop/product/${store.businessActivity}/${productId}/`, {}, function (data) {
    productPrices.value[productId] = data.price; 
  }, true);
  return 0;
};

const totalItems = computed(() => {
  return orderStore.products.reduce((total, product) => total + product.quantity, 0);
});

const totalPrice = computed(() => {
  return orderStore.products.reduce((total, product) => {
    const price = getProductPrice(product.product); 
    return total + (price * product.quantity); 
  }, 0).toFixed(2) + ' €'; 
});

const increaseQuantity = (product) => {
  orderStore.addProduct(product);
};

const decreaseQuantity = (product) => {
  orderStore.removeProduct(product);
};

const placeOrder = () => {
  try {
    orderStore.submitOrders(store.businessActivity);
    popupStore.setPopup('Ordine inviato correttamente!', "success");
  } catch (error) {
    popupStore.setPopup('Impossibile inviare l\'ordine!', "error");
  }
};

const clearCart = () => {
  try {
    orderStore.removeAllProduct();
    popupStore.setPopup('Carrello svuotato correttamente!', "success");
  } catch (error) {
    popupStore.setPopup('Impossibile svuotare il carrello!', "error");
  }
};

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

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
