<template>
  <v-container>
    <Loading v-if="loading" />
    <v-row>
      <v-col cols="12" md="3" v-for="(product, index) in products" :key="product.id">
        <v-card class="mb-5">
          <v-img
            height="200"
            :src="getImageForProduct(product)"
            cover
          />
          <v-card-title class="text-h6">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ product.product_type ? product.product_type : 'Non specificata' }}
          </v-card-subtitle>

          <v-card-text>
            <div>
              Prezzo: {{ product.price ? formatPrice(product.price) : 'Non disponibile' }}
            </div>
            <div>
              Disponibilità: 
              <span v-if="product.inventory">
                {{ product.inventory.quantity >= 0 ? product.inventory.quantity : 'Non disponibile' }}
              </span>
              <span v-else>Non disponibile</span>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="purple" :to="`/product/${product.id}`">
              Dettagli
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-img
          height="300"
          :src="getImageForProduct(selectedProduct)"
          cover
        />
        <v-card-title class="text-h6">
          {{ selectedProduct?.name }}
        </v-card-title>
        <v-card-subtitle>
          Prezzo: {{ selectedProduct?.price ? formatPrice(selectedProduct.price) : 'Non disponibile' }}
        </v-card-subtitle>
        <v-card-text>

          <div>
            Descrizione:
            <span v-if="selectedProduct?.description">
              {{ selectedProduct.description}}
            </span>
            <span v-else>Non disponibile</span>
          </div>

          <div>
            Categoria: {{ selectedProduct?.product_type ? selectedProduct.product_type : 'Non specificata' }}
          </div>

          <div>
            Disponibilità: 
            <span v-if="selectedProduct?.inventory">
              {{ selectedProduct.inventory.quantity >= 0 ? selectedProduct.inventory.quantity : 'Non disponibile' }}
            </span>
            <span v-else>Non disponibile</span>
          </div>

        </v-card-text>
        <v-card-actions>
          <v-btn color="purple" text @click="dialog = false">
            Chiudi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import http from '@/utils/http';
import Loading from '@/layouts/Loading';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const store = data.value.store;

const products = ref([]);
const dialog = ref(false);
const loading = ref(true);
const selectedProduct = ref(null);

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2) + ' €';
};

const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const fetchProducts = () => {
  http.getRequestBrooking(`api/shop/product/${store.businessActivity}/`, {}, function (data) {
    products.value = data;
    loading.value = false;
  }, true);
};

onMounted(() => {
  fetchProducts();
});
</script>
