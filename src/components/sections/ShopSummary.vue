<template>
  <v-container>
    <h1
      :style="{ color: info.primaryColor }"
      v-html="getText(store.content?.title) || 'I nostri ultimi articoli'"
    />
    <CarouselWrapper
      :items="latestItems"
      :primary-color="info.primaryColor"
      :item-key="(item, index) => item.name + '-' + index"
    >
      <template #default="{ item }">
        <v-card class="mb-5">
          <v-img
            height="300"
            :src="getImageForProduct(item)"
            cover
          />
          <v-card-title class="text-h6">
            {{ getText(item.name) }}
          </v-card-title>
          <v-card-text>
            <div class="d-flex">
              {{ getText(store.content?.price) || 'Prezzo' }}:
              <p
                style="margin-left: 5px;"
                v-html="getPrice(item)"
              />
            </div>
            <div
              v-if="item.quantity"
              class="d-flex"
            >
              {{ getText(store.content?.quantity) || 'Quantità' }}:
              <p
                style="margin-left: 5px;"
                v-html="item.quantity"
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="text-none"
              :to="`/product/${item.id}`"
              variant="flat"
              :color="info.primaryColor"
            >
              {{ getText(store.content?.details) || 'Dettagli' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </CarouselWrapper>
    <p
      class="more mb-4"
      @click="router.push('/shop')"
    >
      Vai alla pagina shop...
    </p>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/data';
import { useShopStore } from '@/stores/shop';
import { useLanguageStore } from '@/stores/language';
import { getImageForProduct, getPrice } from '@/utils/shop';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue';

const router = useRouter();
const dataStore = useDataStore();
const shopStore = useShopStore();
const { getText } = useLanguageStore();

const { data } = storeToRefs(dataStore);
const { info } = defineProps({
  info: {
    type: Object,
    required: true
  }
});
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

<style scoped>
.more {
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  position: relative;
  display: inline-block;
}

.more::after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}

.more:hover::after {
  width: 100%;
  left: 0;
  transform: none;
}
</style>
