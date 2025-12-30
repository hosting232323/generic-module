<template>
  <v-container>
    <Loading v-if="!ready" />
    <v-row v-else-if="product">
      <v-col cols="12" md="7">
        <v-card class="position-relative" >

          <v-carousel v-model="activeImage" hide-delimiter-background show-arrows="hover" height="600" hide-delimiters v-if="product.images?.length > 1">
            <template #prev="{ props }">
              <v-btn icon class="carousel-arrow left" :color="info.primaryColor" variant="flat" v-bind="props">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </template>

            <template #next="{ props }">
              <v-btn icon class="carousel-arrow right" :color="info.primaryColor" variant="flat" v-bind="props">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <v-carousel-item v-for="(image, index) in product.images" :key="index">
              <v-img :src="image" height="600" cover />
            </v-carousel-item>
          </v-carousel>

          <div v-if="product.images?.length > 1" class="thumbnails">
            <v-img v-for="(image, index) in product.images" :key="index" :src="image" width="60" height="60" cover
              class="thumbnail" :class="{ active: activeImage === index }" @click="activeImage = index" />
          </div>

          <v-img v-else :src="getImageForProduct(product)" height="600" cover />
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title class="text-h5" style="white-space: normal;">{{ getText(product.name) }}</v-card-title>
          <v-card-subtitle>
            {{ getText(store.content?.price) || 'Prezzo' }}: <strong v-html="getPrice(product)"></strong>
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <div class="mb-3" v-if="product.description">
              <strong>{{ getText(store.content?.description) || 'Descrizione' }}:</strong>
              <p v-html="getText(product.description)" />
            </div>
            <div class="mb-3">
              <strong>{{ getText(store.content?.category) || 'Categoria' }}:</strong>
              {{ getText(product.category) || 'Non specificata' }}
            </div>
            <div v-if="product.variant && product.variant.length > 0" class="mb-3">
              <v-divider class="mb-3" />
              <strong>{{ getText(store.content?.size) || 'Taglie' }}</strong>
              <div class="d-flex mt-2">
                <div v-for="value in product.variant" class="mr-4">
                  <v-btn v-if="value.quantity" @click="addToCart(Number(route.params.id), value)"
                    :color="info.primaryColor">{{ value.name }}</v-btn>
                </div>
              </div>
              <v-divider class="mt-3" />
            </div>
          </v-card-text>
          <v-card-actions :class="[isMobile ? 'd-flex flex-column align-start' : '']" :style="{gap: isMobile ? '0' : '0.5rem'}">
            <v-btn class="ma-2" variant="flat" :color="info.primaryColor" @click="addToCart(Number(route.params.id))" :disabled="product.variant > 0">
              <v-icon icon="mdi-cart-outline" class="ml-1" start></v-icon>
              {{ getText(store.content?.addToCart) || 'Aggiungi al carrello' }}
            </v-btn>
            <v-btn class="ma-2" variant="flat" :color="info.primaryColor" @click="fastCheckout">
              <v-icon icon="mdi-credit-card-outline" class="ml-1" start></v-icon>
              {{ getText(store.content?.fastCheckout) || 'Compra ora' }}
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
    <v-dialog v-model="isCheckout" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">
          {{ getText(store.content?.addressTitle) || 'Inserisci indirizzo di spedizione' }}
        </v-card-title>
        <v-card-text>
          <Address @update:valid="isFormValid = $event" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="placeOrder" :disabled="!isFormValid">{{ getText(store.content?.buy) || 'Acquista' }}</v-btn>
          <v-btn @click="isCheckout = false">{{ getText(store.content?.close) || 'Chiudi' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import Address from '@/layouts/Address';
import Loading from '@/layouts/Loading';
import Popup from '@/components/sections/Popup';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { setupMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';
import { getImageForProduct, addToCart, getPrice } from '@/utils/shop';

const route = useRoute();
const product = ref(null);
const isCheckout = ref(null);
const isFormValid = ref(false);
const shopStore = useShopStore();
const dataStore = useDataStore();
const isMobile = setupMobileUtils();

const { data } = storeToRefs(dataStore);
const { getText } = useLanguageStore();
const { products, ready } = storeToRefs(shopStore);
const info = data.value.info;
const store = data.value.store;
const activeImage = ref(0);


const fastCheckout = async () => {
  if (!store.addressMode)
    await placeOrder();
  else
    isCheckout.value = true;
};

const placeOrder = async () => {
  shopStore.placeOrder(store.projectName, [{
    product: Number(route.params.id),
    quantity: 1
  }]);
}

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

<style scoped>
.thumbnails {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 10px;
  border-radius: 12px;
}

.thumbnail {
  cursor: pointer;
  border-radius: 6px;
  opacity: 0.6;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.thumbnail:hover {
  opacity: 1;
}

.thumbnail.active {
  opacity: 1;
  border-color: white;
}
</style>