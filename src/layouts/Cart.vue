<template>
  <v-menu v-model="isMenuVisible" transition="scale-transition">
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

    <v-card class="mt-4" style="width: 400px;">
      <v-card-title>
        <span>Riepilogo Ordini</span>
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item v-for="(product, index) in orderStore.products" :key="product.id">
            <v-row align="center" style="width: 100%;">
              <v-col style="display: flex; align-items: center; justify-content: space-between;">
                  <p style="font-size: 15px;">{{ getProductName(product.product) }}</p>
                  <v-list-item-subtitle>
                    Quantità: 
                    <v-btn @click="decreaseQuantity(product)" icon="mdi-minus" size="x-small" />
                    {{ product.quantity }}
                    <v-btn @click="increaseQuantity(product)" icon="mdi-plus" size="x-small" />
                  </v-list-item-subtitle>
              </v-col>
            </v-row>
            <hr class="mt-2">

          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="placeOrder" color="primary">Invia Ordine</v-btn>
        <v-btn @click="clearCart" color="red">Svuota Carrello</v-btn>
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

const isMobile = mobile.setupMobileUtils();



const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const store = data.value.store;

const orderStore = useOrderStore();
const isMenuVisible = ref(false);

const productNames = ref({});

const getProductName = (productId) => {
  if (productNames.value[productId]) {
    return productNames.value[productId];
  }
  http.getRequestBrooking(`api/shop/product/${store.businessActivity}/${productId}/`, {}, function (data) {
    productNames.value[productId] = data.name; 
  }, true);
  return 'Caricamento...';
};


const totalItems = computed(() => {
  return orderStore.products.reduce((total, product) => total + product.quantity, 0);
});

const increaseQuantity = (product) => {
  orderStore.addProduct(product);
};

const decreaseQuantity = (product) => {
  orderStore.removeProduct(product);
};

const placeOrder = () => {
  orderStore.submitOrders(store.businessActivity);
  console.log('Ordine inviato:', orderStore.products);
};

const clearCart = () => {
  orderStore.removeAllProduct();
};
</script>
