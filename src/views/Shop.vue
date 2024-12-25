<template>
  <v-container>
    <Loading v-if="loading" />
    <v-row v-else>
      <v-col cols="12" v-for="(group, category) in groupedProducts" :key="category">
        <h3 class="text-h5 mb-3" :style="{ color: info.primaryColor }">{{ category }}</h3>
        <hr :style="{ height: '3px', margin: '-10px 0 10px', backgroundColor: info.primaryColor, border: 'none' }" />
        <v-row>
          <v-col cols="12" md="4" v-for="product in group" :key="product.id">
            <v-card class="mb-5">
              <v-img height="400" :src="getImageForProduct(product)" cover />
              <v-card-title class="text-h6">{{ product.name }}</v-card-title>
              <v-card-text>
                <div>
                  Prezzo: {{ product.price ? formatPrice(product.price) : 'Non disponibile' }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="text-none" :to="`/product/${product.id}`" variant="flat" :color="info.primaryColor">
                  Dettagli
                </v-btn>
                <v-btn class="text-none ma-2" variant="flat" :color="info.secondaryColor" @click="addToCart(product.id)">
                  Aggiungi al carrello
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <Popup />
    </v-row>
  </v-container>
</template>

<script setup>
import http from '@/utils/http';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import Loading from '@/layouts/Loading';
import Popup from '@/components/sections/Popup';

import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { usePopupStore } from '@/stores/popup';

const orderStore = useOrderStore();
const popupStore = usePopupStore();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;

const route = useRoute();
const loading = ref(true);
const groupedProducts = ref({});

const formatPrice = (price) => {
  return (parseFloat(price) / 100).toFixed(2) + ' €';
};

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const groupProductsByCategory = (productsArray) => {
  const grouped = productsArray.reduce((acc, product) => {
    const category = product.product_type || 'Non specificata';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  Object.keys(grouped).forEach((category) => {
    grouped[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
};

const fetchProducts = () => {
  http.getRequestGenericBE('products', {}, function (data) {
    groupedProducts.value = groupProductsByCategory(data);
    loading.value = false;

    if (route.query.order)
      popupStore.setPopup('Ordine effettuato con successo!', 'success');
  });
};

const addToCart = (productId) => {
  try {
    orderStore.addProduct({
      product: productId,
      quantity: 1
    });
    popupStore.setPopup('Aggiunto al carrello!', 'success');
  } catch (error) {
    popupStore.setPopup('Impossibile aggiungere al carrello!', 'error');
  }
}

onMounted(() => {
  fetchProducts();
});
</script>
