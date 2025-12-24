<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(store.content?.title) || 'I nostri ultimi articoli'"/>
    <CarouselWrapper
      :items="latestItems"
      :primaryColor="info.primaryColor"
      :itemKey="(item, index) => item.name + '-' + index"
    >
      <template #default="{ item }">
        <v-card class="mb-5">
          <v-img height="300" :src="getImageForProduct(item)" cover />
          <v-card-title class="text-h6">{{ getText(item.name) }}</v-card-title>
          <v-card-text>
            <div class="d-flex">
              {{ getText(store.content?.price) || 'Prezzo' }}:
              <p v-html="getPrice(item)" style="margin-left: 5px;"></p>
            </div>
            <div v-if="item.quantity" class="d-flex">
              {{ getText(store.content?.quantity) || 'Quantità' }}:
              <p v-html="item.quantity" style="margin-left: 5px;"></p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="text-none" :to="`/product/${item.id}`" variant="flat" :color="info.primaryColor">
              {{ getText(store.content?.details) || 'Dettagli' }}
            </v-btn>
            <!-- <v-btn class="text-none ma-2" variant="flat" :color="info.secondaryColor" @click="addToCart(item.id)">
              Aggiungi al carrello
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </template>
    </CarouselWrapper>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useShopStore } from '@/stores/shop';
import { useLanguageStore } from '@/stores/language';
import { getImageForProduct, getPrice } from '@/utils/shop';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue';

const dataStore = useDataStore();
const shopStore = useShopStore();
const { getText } = useLanguageStore();

const { data } = storeToRefs(dataStore);
const { info } = defineProps(['content', 'info']);
const { products, ready } = storeToRefs(shopStore);
const store = data.value.store;

if (!ready.value) {
  shopStore.initData(data.value.store, () => {});
}

const latestItems = computed(() => {
  const highlighted = products.value.filter(p => p.highlight);
  return highlighted.length ? highlighted.slice(0, 3) : products.value.slice(-3);
});
</script>
