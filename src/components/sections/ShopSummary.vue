<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri ultimi articoli'"/>
    
    <CarouselWrapper
      :items="latestItems"
      :primaryColor="info.primaryColor"
      :itemKey="(item, index) => item.name + '-' + index"
    >
      <template #default="{ item }">
        <v-card class="mb-5">
          <v-img height="300" :src="getImageForProduct(item)" fill />
          <v-card-title class="text-h6">{{ getText(item.name) }}</v-card-title>
          <v-card-text>
            <div>
              Prezzo: {{ item.price ? formatPrice(item.price) : 'Non disponibile' }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="text-none" :to="`/product/${item.id}`" variant="flat" :color="info.primaryColor">
              Dettagli
            </v-btn>
            <v-btn class="text-none ma-2" variant="flat" :color="info.secondaryColor" @click="addToCart(item.id)">
              Aggiungi al carrello
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </CarouselWrapper>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

import { useLanguageStore } from '@/stores/language';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const shop = data.value.shop;
const flaggedItems = shop.filter(item => item.highlight === true);
const latestItems = flaggedItems.length > 0 ? flaggedItems.slice(0, 3) : shop.slice(-3);

const formatPrice = (price) => {
  return (parseFloat(price) / 100).toFixed(2) + ' €';
};
const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};
</script>
