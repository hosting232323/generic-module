<template>
  <v-container>
    <Loading v-if="loading" />
    <v-row v-else>
      <v-col cols="12" v-for="(group, category) in groupedProducts" :key="category">
        <h3 class="text-h5 mb-3" :style="{ color: info.primaryColor }">{{ category }}</h3>
        <hr :style="{ height: '3px', margin: '-10px 0 10px', backgroundColor: info.primaryColor, border: 'none' }" />
        <v-row>
          <v-col cols="12" md="3" v-for="product in group" :key="product.id">
            <v-card class="mb-5">
              <v-img height="200" :src="getImageForProduct(product)" cover />
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
      <Popup></Popup>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import http from '@/utils/http';
import Loading from '@/layouts/Loading';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

import Popup from '@/components/sections/Popup.vue';

import { useOrderStore } from '@/stores/order';
import { usePopupStore } from '@/stores/popup';

const orderStore = useOrderStore();
const popupStore = usePopupStore();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const info = data.value.info;
const store = data.value.store;

const loading = ref(true);
const groupedProducts = ref({});

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2) + ' €';
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
  http.getRequestBrooking(`api/shop/product/${store.businessActivity}/`, {}, function (data) {
    groupedProducts.value = groupProductsByCategory(data);
    loading.value = false;
  }, true);
};

const addToCart = (productId) => {
  const body = {
    product: productId,
    quantity: 1
  }
  try {
    orderStore.addProduct(body);
    popupStore.setPopup('Aggiunto al carrello!', "success");
  } catch (error) {
    popupStore.setPopup('Impossibile aggiungere al carrello!', "error");
  }
}

onMounted(() => {
  fetchProducts();
});
</script>
