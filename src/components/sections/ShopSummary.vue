<template>
  <v-container class="py-12">
    <div class="text-center mb-8">
      <h2 class="text-h3 font-weight-bold mb-3" :style="{ color: info.primaryColor }">
        {{ getText(info.title) }}
      </h2>
      <p class="text-h6 text-grey-darken-1">
        {{ getText(info.subtitle) }}
      </p>
    </div>
    
    <CarouselWrapper
      v-if="latestItems.length > 0"
      :items="latestItems"
      :primaryColor="info.primaryColor"
      :itemKey="(item, index) => item.name + '-' + index"
    >
      <template #default="{ item }">
        <v-card class="mb-5" elevation="3" hover>
          <v-img height="300" :src="getImageForProduct(item)" cover />
          <v-card-title class="text-h6">{{ item.name }}</v-card-title>
          <v-card-text>
            <p class="text-body-2 text-grey-darken-1">{{ item.description }}</p>
            <div class="text-h6 font-weight-bold mt-2" :style="{ color: info.primaryColor }">
              {{ formatPrice(item.price) }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="text-none" :to="`/product/${item.id}`" variant="outlined" :color="info.primaryColor">
              Dettagli
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="text-none" variant="flat" :color="info.primaryColor" @click="addToCart(item.id)">
              <v-icon start>mdi-cart-plus</v-icon>
              Aggiungi
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </CarouselWrapper>

    <div v-else class="text-center py-8">
      <p class="text-grey">Nessun prodotto disponibile al momento</p>
    </div>

    <div v-if="content?.showButton" class="text-center mt-8">
      <v-btn
        :to="content.buttonUrl || '/shop'"
        size="large"
        :color="info.primaryColor"
        variant="flat"
        class="text-none"
      >
        {{ getText(content.buttonText) || 'Vedi Menu Completo' }}
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useShopStore } from '@/stores/shop';
import { useOrderStore } from '@/stores/order';
import { usePopupStore } from '@/stores/popup';

import { useLanguageStore } from '@/stores/language';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue'

const dataStore = useDataStore();
const shopStore = useShopStore();
const orderStore = useOrderStore();
const popupStore = usePopupStore();
const { data } = storeToRefs(dataStore);
const { products } = storeToRefs(shopStore);

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

onMounted(() => {
  if (!shopStore.ready && data.value.store) {
    shopStore.initData(data.value.store);
  }
});

const latestItems = computed(() => {
  if (!products.value || products.value.length === 0) return [];
  
  const limit = content?.limit || 3;
  const flaggedItems = products.value.filter(item => item.highlight === true);
  return flaggedItems.length > 0 ? flaggedItems.slice(0, limit) : products.value.slice(0, limit);
});

const formatPrice = (price) => {
  return (parseFloat(price) / 100).toFixed(2) + ' €';
};

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const addToCart = (productId) => {
  try {
    orderStore.addProduct({ product: productId, quantity: 1 });
    popupStore.setPopup('Prodotto aggiunto al carrello!', 'success');
  } catch (error) {
    popupStore.setPopup('Errore nell\'aggiunta al carrello', 'error');
  }
};
</script>
