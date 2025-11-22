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
          <v-card-title class="text-h5" style="white-space: normal;">{{ getText(product.name) }}</v-card-title>
          <v-card-subtitle>
            {{ getText(store.content?.price) || 'Prezzo' }}: <strong>{{ (parseFloat(product.price) / 100).toFixed(2) }} €</strong>
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text>
            <div class="mb-3" v-if="product.description">
              <strong>{{ getText(store.content?.description) || 'Descrizione' }}:</strong>
              <p v-html="getText(product.description)" />
            </div>

            <div class="mb-3">
              <strong>{{ getText(store.content?.category) || 'Categoria' }}:</strong>
              {{ getText(product.category) || 'Non specificata' }}
            </div>

            <div v-if="product.variant" v-for="value in product.variant">
              <v-btn style="border-radius: 100%;" @click="addToCart(value.name)">{{ value.name }}</v-btn>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="ma-2" variant="flat" :color="info.primaryColor" @click="addToCart">
              <v-icon icon="mdi-cart-outline" class="ml-1" start></v-icon>
              {{ getText(store.content?.addToCart) || 'Aggiungi al carrello' }}
            </v-btn>
            <v-btn class="ma-2" variant="flat" :color="info.primaryColor" @click="fastCheckout">
              <v-icon icon="mdi-credit-card-outline" class="ml-1" start></v-icon>
              {{ getText(store.content?.fastCheckout) || 'Compra ora' }}
            </v-btn>
            <v-divider />
            <v-btn :color="info.primaryColor" @click="router.back()">
              <v-icon icon="mdi-arrow-left" start></v-icon>
              {{ getText(store.content?.goBack) || 'Torna indietro' }}
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
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { usePopupStore } from '@/stores/popup';
import { useOrderStore } from '@/stores/order';
import { useRoute, useRouter } from 'vue-router';
import { useLanguageStore } from '@/stores/language';

const route = useRoute();
const product = ref(null);
const isCheckout = ref(null);
const router = useRouter();
const shopStore = useShopStore();
const dataStore = useDataStore();
const orderStore = useOrderStore();
const popupStore = usePopupStore();

const { data } = storeToRefs(dataStore);
const { products, ready } = storeToRefs(shopStore);
const { getText } = useLanguageStore();
const info = data.value.info;
const store = data.value.store;
const isFormValid = ref(false);

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const addToCart = (variant = null) => {
  try {
    orderStore.addProduct({
      product: Number(route.params.id),
      quantity: 1,
      variant: variant
    });
    popupStore.setPopup('Aggiunto al carrello!', 'success');
  } catch (error) {
    popupStore.setPopup('Impossibile aggiungere al carrello!', 'error');
  }
};

const fastCheckout = async () => {
  if (!store.addressMode) {
    await placeOrder();
  } else {
    isCheckout.value = true;
  }
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
