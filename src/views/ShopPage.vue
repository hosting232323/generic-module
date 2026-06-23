<template>
  <v-container>
    <AppLoading v-if="!ready" />
    <template v-else>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="searchQuery"
            :label="store.content?.search || 'Cerca prodotto'"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            bg-color="white"
            clearable
            hide-details
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="selectedCategory"
            :items="categoryItems"
            :label="store.content?.category || 'Categoria'"
            variant="outlined"
            density="comfortable"
            bg-color="white"
            clearable
            hide-details
          />
        </v-col>
      </v-row>
      <v-row v-if="!hasResults">
        <v-col cols="12">
          <v-alert type="info">
            {{ getText(store.content?.noResults) || 'Nessun prodotto trovato.' }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="(group, category) in groupedProducts"
          :key="category"
          cols="12"
        >
          <template v-if="category">
            <h3
              class="text-h5 mb-3"
              :style="{ color: info.primaryColor }"
            >
              {{ category }}
            </h3>
            <hr :style="{ height: '3px', margin: '-10px 0 10px', backgroundColor: info.primaryColor, border: 'none' }">
          </template>
          <v-row>
            <v-col
              v-for="product in group"
              :key="product.id"
              cols="12"
              md="4"
            >
              <v-card class="mb-5">
                <v-img
                  height="400"
                  :src="getImageForProduct(product)"
                  cover
                />
                <v-card-title
                  class="text-h6"
                  style="white-space: normal;"
                >
                  {{ product.name }}
                </v-card-title>
                <v-card-text>
                  <div class="d-flex">
                    {{ getText(store.content?.price) || 'Prezzo' }}:
                    <p
                      style="margin-left: 5px;"
                      v-html="getPrice(product)"
                    />
                  </div>
                  <div
                    v-if="product.quantity"
                    class="d-flex"
                  >
                    {{ getText(store.content?.quantity) || 'Quantità' }}:
                    <p
                      style="margin-left: 5px;"
                      v-html="product.quantity"
                    />
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="text-none"
                    :to="productLink(product.id)"
                    variant="flat"
                    :color="info.primaryColor"
                  >
                    {{ getText(store.content?.details) || 'Dettagli' }}
                  </v-btn>
                  <v-btn
                    v-if="!hasVariant"
                    class="text-none ma-2"
                    variant="flat"
                    :color="info.secondaryColor"
                    @click="addToCart(product.id)"
                  >
                    {{ getText(store.content?.addToCart) || 'Aggiungi al carrello' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <PopUpAlert />
    </template>
  </v-container>
</template>

<script setup>
import AppLoading from '@/layouts/AppLoading';
import PopUpAlert from '@/components/sections/PopUpAlert';

import { useHead } from '@unhead/vue';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useShopStore } from '@/stores/shop';
import { useDataStore } from '@/stores/data';
import { useLanguageStore } from '@/stores/language';
import { getImageForProduct, addToCart, getPrice } from '@/utils/shop';
import { head } from '@/utils/seo.shop.js';

const groupedProducts = ref({});
const searchQuery = ref('');
const selectedCategory = ref(null);
const dataStore = useDataStore();
const shopStore = useShopStore();

const { data, demoId } = storeToRefs(dataStore);
const { getText, getLocale } = useLanguageStore();
const { products, ready } = storeToRefs(shopStore);

const info = data.value.info;
const store = data.value.store;

const hasVariant = computed(() => {
  return products.value.some(product => product.variant && product.variant.length > 0);
});

const categoryItems = computed(() => {
  return [...new Set(products.value.map(p => p.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
});

const hasResults = computed(() => Object.keys(groupedProducts.value).length > 0);

const filterProducts = () => {
  const query = (searchQuery.value || '').trim().toLowerCase();
  return products.value.filter(product => {
    if (selectedCategory.value && product.category !== selectedCategory.value)
      return false;

    if (query) {
      const name = (product.name || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      if (!name.includes(query) && !description.includes(query))
        return false;
    }

    return true;
  });
};

const groupProductsByCategory = () => {
  const filtered = filterProducts();
  const hasAnyCategory = filtered.some(p => p.category);
  const grouped = filtered.reduce((acc, product) => {
    let category = product.category;
    if (!category) {
      category = hasAnyCategory ? 'Altri Prodotti' : '';
    };

    if (!acc[category]) acc[category] = [];
    acc[category].push(product);

    return acc;
  }, {});

  const sortedGrouped = {};
  Object.keys(grouped)
    .sort((a, b) => {
      if (a === 'Altri Prodotti') return 1;
      if (b === 'Altri Prodotti') return -1;
      return a.localeCompare(b);
    })
    .forEach(category => {
      sortedGrouped[category] = grouped[category];
    });

  groupedProducts.value = sortedGrouped;
};

if (ready.value)
  groupProductsByCategory();
else
  shopStore.initData(data.value.store, function () {
    groupProductsByCategory();
  });

const productLink = (product_id) => {
  return demoId.value ? `/demo/${demoId.value}/product/${product_id}` : `/product/${product_id}`;
};

watch([getLocale, products, searchQuery, selectedCategory], () => {
  if (ready.value) groupProductsByCategory();
}, { immediate: true });

useHead(head);
</script>
