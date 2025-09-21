<template>
  <v-container>
    <Loading v-if="!ready" />

    <v-row v-else-if="product">
      <v-col cols="12" md="6">
        <v-card>
          <v-carousel v-if="product.images && product.images.length > 0" hide-delimiter-background>
            <v-carousel-item v-for="(image, index) in product.images" :key="index">
              <v-img :src="image" height="600" cover></v-img>
            </v-carousel-item>
          </v-carousel>
          <v-img v-else :src="getImageForProduct(product)" height="600" cover />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">{{ product.name }}</v-card-title>
          <v-card-subtitle>
            Prezzo: <strong>{{ (parseFloat(product.price) / 100).toFixed(2) }} €</strong>
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text>
            <div class="mb-3">
              <strong>Descrizione:</strong>
              <p v-html="product.description" />
            </div>

            <div class="mb-3">
              <strong>Categoria:</strong>
              {{ product.product_type || 'Non specificata' }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="ma-2" variant="flat" :color="info.primaryColor" @click="addToCart">
              <v-icon icon="mdi-cart-outline" class="ml-1" start></v-icon>
              Aggiungi al carrello
            </v-btn>
            <v-divider />
            <v-btn :color="info.primaryColor" @click="router.back()">
              <v-icon icon="mdi-arrow-left" start></v-icon>
              Torna indietro
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-alert type="error">Errore: nessun prodotto trovato.</v-alert>
      </v-col>
    </v-row>
    <Popup />
  </v-container>
</template>

<script setup>
import Loading from '@/layouts/Loading.vue';
import Popup from '@/components/sections/Popup.vue';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { usePopupStore } from '@/stores/popup';
import { useOrderStore } from '@/stores/order';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const product = ref(null);
const router = useRouter();
const shopStore = useShopStore();
const dataStore = useDataStore();
const orderStore = useOrderStore();
const popupStore = usePopupStore();

const { data } = storeToRefs(dataStore);
const { products, ready } = storeToRefs(shopStore);
const info = data.value.info;

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const addToCart = () => {
  try {
    orderStore.addProduct({
      product: route.params.id,
      quantity: 1
    });
    popupStore.setPopup('Aggiunto al carrello!', "success");
  } catch (error) {
    popupStore.setPopup('Impossibile aggiungere al carrello!', "error");
  }
};

const initProductByRoute = () => {
  product.value = products.value.find(product => product.id == route.params.id);
};

if (ready.value)
  initProductByRoute();
else
  shopStore.initData(data.value.store, function () {
    initProductByRoute();
  });
</script>
