<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri ultimi articoli'"/>
    <v-row>
      <transition-group name="fade" tag="div" class="d-flex flex-wrap justify-center" style="width: 100%; position: relative;">

      <v-col 
        :cols="itemsPerPage === 1 ? 12 : (itemsPerPage === 2 ? 6 : 4)"
        v-for="product in visibleItems" 
        :key="product.id"
      >
        <v-card class="mb-5">
          <v-img height="300" :src="getImageForProduct(product)" fill />
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
      </transition-group>
    </v-row>
        <div v-if="totalGroups > 1" class="controls-with-indicators mt-4">
      <v-btn icon @click="prevReview" variant="text" class="nav-arrow">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <div class="indicator-container">
        <span
          v-for="(group, i) in totalGroups"
          :key="i"
          :class="['dot', { active: currentGroupIndex === i }]"
          :style="currentGroupIndex === i ? { backgroundColor: info.primaryColor } : {}"
          @click="setGroup(i)"
        />
      </div>

      <v-btn icon @click="nextReview" variant="text" class="nav-arrow">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';
import { useDataStore } from '@/stores/data';

import { setupMobileUtils, resolveImg } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const { smAndDown, mdAndDown } = useDisplay();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const { getText } = useLanguageStore();
const isMobile = setupMobileUtils();
const { content, info } = defineProps(['content', 'info']);
const shop = data.value.shop;
const flaggedItems = shop.filter(item => item.highlight === true);
const latestItems = flaggedItems.length > 0 ? flaggedItems.slice(0, 3) : shop.slice(-3);
const currentGroupIndex = ref(0);
let intervalId;

const formatPrice = (price) => {
  return (parseFloat(price) / 100).toFixed(2) + ' €';
};
const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const itemsPerPage = computed(() => {
  if (smAndDown.value) return 1
  if (mdAndDown.value) return 2
  return 3
})
const visibleItems = computed(() => {
  const start = currentGroupIndex.value * itemsPerPage.value
  return latestItems.slice(start, start + itemsPerPage.value)
})

const totalGroups = computed(() => {
  return Math.ceil(latestItems.length / itemsPerPage.value)
})

const nextReview = () => {
  currentGroupIndex.value = (currentGroupIndex.value + 1) % totalGroups.value;
  resetInterval();
}

const prevReview = () => {
  currentGroupIndex.value = (currentGroupIndex.value - 1 + totalGroups.value) % totalGroups.value;
  resetInterval();
}

const startInterval = () => {
  if (totalGroups.value > 1) {
    intervalId = setInterval(nextReview, 4000);
  }
}

const resetInterval = () => {
  clearInterval(intervalId);
  startInterval();
}

onMounted(() => {
  startInterval();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
})

</script>

<style scoped>
.shop-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}

.shop-item {
  width: 300px;
  border-radius: 8px;
}

.dotted-line-big {
  height: 8px;
  background-size: 7px 7px;
  background-repeat: repeat-x;
  margin: 15px 0;
}

.controls-with-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.indicator-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #bbb;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: relative;
  display: flex;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
  width: 100%;
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  width: 100%;
}

.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  width: 100%;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
  width: 100%;
}
</style>
