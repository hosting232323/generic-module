<template>
  <v-container>
    <Loading v-if="loading" />

    <v-row v-else-if="product">
      <v-col cols="12" md="6">
        <v-card>
          <v-carousel v-if="product.images && product.images.length > 0" hide-delimiter-background>
            <v-carousel-item v-for="(image, index) in product.images" :key="index">
              <v-img :src="image" height="400" cover></v-img>
            </v-carousel-item>
          </v-carousel>
          <v-img v-else :src="getImageForProduct(product)" height="400" cover />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">{{ product.name }}</v-card-title>
          <v-card-subtitle>Prezzo: <strong>{{ formatPrice(product.price) }}</strong></v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text>
            <div class="mb-3">
              <strong>Descrizione:</strong>
              <p>{{ product.description }}</p>
            </div>

            <div class="mb-3">
              <strong>Categoria:</strong>
              <p>{{ product.product_type || 'Non specificata' }}</p>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="text-none ma-2" variant="flat" :color="info.primaryColor" @click="addToCart">
              <v-icon icon="mdi-cart-outline" class="ml-1" start></v-icon>
              Aggiungi al carrello
            </v-btn>
            <v-btn class="ma-2" :color="info.secondaryColor" @click="goBack">
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

    <v-alert 
      v-model="popupVisible" 
      :type="popupType" 
      transition="scale-transition" 
      class="successCart"
    >
      {{ popupContent }}
    </v-alert>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import http from '@/utils/http';
import Loading from '@/layouts/Loading.vue';

import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const orderStore = useOrderStore();

const popupVisible = ref(false);
const popupContent = ref(' ');
const popupType = ref('success');

const info = data.value.info;
const store = data.value.store;

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2) + ' €';
};

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const product = ref(null);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const fetchProductDetails = () => {
  const productId = route.params.id;
  http.getRequestBrooking(
    `api/shop/product/${store.businessActivity}/${productId}/`,
    {},
    function (data) {
      if (data) {
        product.value = data;
      } else {
        console.error("Nessun prodotto trovato con l'ID specificato.");
      }
      loading.value = false;
    },
    true
  );
};

const addToCart = () => {
  const body = {
    product: route.params.id,
    quantity: 1
  }
  try {
    orderStore.addProduct(body);
    popup('Aggiunto al carrello!', "success");
  } catch (error) {
    popup('Impossibile aggiungere al carrello!', "error");
  }
}

const popup = (text, type) => {
  popupContent.value = text;
  popupType.value = type;
  popupVisible.value = true;
  setTimeout(() => {
    popupVisible.value = false;
  }, 2000);
}

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchProductDetails();
});
</script>

<style scoped>
.mb-3 {
  margin-bottom: 16px;
}
.successCart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  user-select: none;
}
</style>
