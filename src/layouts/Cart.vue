<template>
  <v-menu v-model="isMenuVisible" transition="scale-transition">
    <template #activator="{ props }">
      <v-btn v-bind="props">
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
                    <v-btn @click="decreaseQuantity(index)" icon="mdi-minus" size="x-small" />
                    {{ product.quantity }}
                    <v-btn @click="increaseQuantity(index)" icon="mdi-plus" size="x-small" />
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

const increaseQuantity = (index) => {
  orderStore.products[index].quantity++;
};

const decreaseQuantity = (index) => {
  if (orderStore.products[index].quantity > 1) {
    orderStore.products[index].quantity--;
  }
};

const placeOrder = () => {
  // Logica per inviare l'ordine
  console.log('Ordine inviato:', orderStore.products);
  clearCart();
};

const clearCart = () => {
  orderStore.products = []; // Assicurati che questo sia il modo corretto di svuotare il carrello
};
</script>

<style scoped>
/* Stili del componente */
</style>
