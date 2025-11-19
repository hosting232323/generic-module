<template>
  <v-container>
    <Loading v-if="!ready" />
    <v-row v-else>
      <v-col cols="12" v-for="(group, category) in groupedProducts" :key="category">
        <h3 class="text-h5 mb-3" :style="{ color: info.primaryColor }">{{ category }}</h3>
        <hr :style="{ height: '3px', margin: '-10px 0 10px', backgroundColor: info.primaryColor, border: 'none' }" />
        <v-row>
          <v-col cols="12" md="4" v-for="product in group" :key="product.id">
            <v-card class="mb-5">
              <v-img height="400" :src="getImageForProduct(product)" cover />
              <v-card-title class="text-h6">{{ getText(product.name) }}</v-card-title>
              <v-card-text>
                <div class="d-flex">
                  {{ getText(store.content?.price) || 'Prezzo' }}:
                  <p v-html="getPrice(product)" style="margin-left: 5px;"></p>
                </div>
                <div v-if="product.quantity" class="d-flex">
                  {{ getText(store.content?.quantity) || 'Quantità' }}:
                  <p v-html="product.quantity" style="margin-left: 5px;"></p>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="text-none" :to="`/product/${product.id}`" variant="flat" :color="info.primaryColor">
                  {{ getText(store.content?.details) || 'Dettagli' }}
                </v-btn>
                <v-btn class="text-none ma-2" variant="flat" :color="info.secondaryColor" @click="addToCart(product.id)">
                  {{ getText(store.content?.addToCart) || 'Aggiungi al carrello' }}
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
import Loading from '@/layouts/Loading';
import Popup from '@/components/sections/Popup';

import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { usePopupStore } from '@/stores/popup';
import { useLanguageStore } from '@/stores/language';

const groupedProducts = ref({});
const dataStore = useDataStore();
const shopStore = useShopStore();
const orderStore = useOrderStore();
const popupStore = usePopupStore();
const { getText, getLocale } = useLanguageStore();

const { data } = storeToRefs(dataStore);
const { products, ready } = storeToRefs(shopStore);
const info = data.value.info;
const store = data.value.store;

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
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
};

const groupProductsByCategory = () => {
  const grouped = products.value.reduce((acc, product) => {
    const category = getText(product.category) || 'Non specificata';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  Object.keys(grouped).forEach((category) => {
    grouped[category].sort((a, b) => getText(a.name).localeCompare(getText(b.name)));
  });

  groupedProducts.value = grouped;
};

const getPrice = (product) => {
  if(product.discount) {
    return `${parseFloat((product.discount) / 100).toFixed(2)}€ - <s style='color: red;'>${parseFloat((product.price) / 100).toFixed(2)}€</s>`;
  } else if (product.price) {
    return parseFloat((product.price) / 100).toFixed(2) + ' €';
  } else {
    return 'Non disponibile';
  }
}

if (ready.value)
  groupProductsByCategory();
else
  shopStore.initData(data.value.store, function () {
    groupProductsByCategory();
  });

watch([getLocale, products], () => {
  if (ready.value) groupProductsByCategory();
}, { immediate: true });
</script>
