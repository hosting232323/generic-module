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
          <v-card-subtitle class="text-h7 mb-2 d-flex">
            {{ getText(store.content?.price) || 'Prezzo' }}: &nbsp;
            <p v-html="getPrice(product)" />
          </v-card-subtitle>
          <v-divider />
          <ProductVariantSelector v-if="product.variant && product.variant.length > 0" :variants="product.variant"
            @update:selectedVariant="selectedVariant = $event" />
          <v-card-text>
            <v-row align="center" class="mb-3">
              <v-col cols="12" md="6">
                <v-btn block variant="flat" :color="info.primaryColor" :disabled="!selectedVariant"
                  @click="addToCart(Number(route.params.id), selectedVariant)">
                  <v-icon start icon="mdi-cart-outline" />
                  {{ getText(store.content?.addToCart) || 'Aggiungi al carrello' }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn block variant="outlined" :color="info.primaryColor" :disabled="!selectedVariant"
                  v-if="isCartEmpty">
                  <v-icon start icon="mdi-credit-card-outline" @click="fastCheckout" />
                  {{ getText(store.content?.fastCheckout) || 'Compra ora' }}
                </v-btn>
              </v-col>
            </v-row>
            <div class="mb-3">
              <strong>{{ getText(store.content?.category) || 'Categoria' }}:</strong>
              {{ getText(product.category) || 'Non specificata' }}
            </div>
            <div class="mb-5" v-if="product.description">
              <strong>{{ getText(store.content?.description) || 'Descrizione' }}:</strong>
              <p v-html="getText(product.description)" />
            </div>
            <div class="mb-3">
              <strong>{{ getText(store.content?.category) || 'Categoria' }}:</strong>
              {{ getText(product.category) || 'Non specificata' }}
            </div>
            <div class="mb-3" v-if="product.description">
              <strong>{{ getText(store.content?.description) || 'Descrizione' }}:</strong>
              <p v-html="getText(product.description)" />
            </div>
          </v-card-text>
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

import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { useLanguageStore } from '@/stores/language';
import { getImageForProduct, addToCart, getPrice } from '@/utils/shop';
import ProductVariantSelector from '@/components/shop/ProductVariantSelector';
import { useOrderStore } from '@/stores/order';

const orderStore = useOrderStore();

const route = useRoute();
const product = ref(null);
const isCheckout = ref(null);
const isFormValid = ref(false);
const shopStore = useShopStore();
const dataStore = useDataStore();

const selectedVariant = ref(null);

const { data } = storeToRefs(dataStore);
const { products: cart } = storeToRefs(orderStore);
const { getText } = useLanguageStore();
const { products, ready } = storeToRefs(shopStore);
const info = data.value.info;
const store = data.value.store;

const isCartEmpty = computed(() => cart.value.length === 0)

const placeOrder = async () => {
  shopStore.placeOrder(store.projectName, [{
    product: Number(route.params.id),
    quantity: 1
  }]);
}

const fastCheckout = async () => {
  if (!store.addressMode)
    await placeOrder();
  else
    isCheckout.value = true;
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
