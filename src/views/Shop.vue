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
              <v-card-title class="text-h6">{{ product.name }}</v-card-title>
              <v-card-text>
                <div>
                  {{ getText(store.content.price) || 'Prezzo' }}
                  {{ product.price ? ((parseFloat(product.price) / 100).toFixed(2) + ' €') : 'Non disponibile' }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="text-none" :to="`/product/${product.id}`" variant="flat" :color="info.primaryColor">
                  {{ getText(store.content.details) || 'Dettagli' }}
                </v-btn>
                <v-btn class="text-none ma-2" variant="flat" :color="info.secondaryColor" @click="addToCart(product.id)">
                  {{ getText(store.content.addToCart) || 'Aggiungi al carrello' }}
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

import { ref } from 'vue';
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
const { getText } = useLanguageStore();

const { data } = storeToRefs(dataStore);
const { products, ready } = storeToRefs(shopStore);
const info = data.value.info;
const store = data.value.store;

const exampleProducts = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'Pomodoro, mozzarella e basilico fresco',
    price: 700,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    product_type: 'Pizze'
  },
  {
    id: 2,
    name: 'Pizza Diavola',
    description: 'Mozzarella, salame piccante e pomodoro',
    price: 850,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    product_type: 'Pizze'
  },
  {
    id: 3,
    name: 'Pizza Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmigiano e fontina',
    price: 900,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    product_type: 'Pizze'
  },
  {
    id: 4,
    name: 'Tiramisù',
    description: 'Classico dolce al cucchiaio con caffè',
    price: 600,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    product_type: 'Dolci'
  },
  {
    id: 5,
    name: 'Panna Cotta',
    description: 'Dolce a base di panna con frutti di bosco',
    price: 500,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    product_type: 'Dolci'
  },
  {
    id: 6,
    name: 'Birra Artigianale IPA',
    description: 'India Pale Ale luppolata e agrumata, 6.5%',
    price: 600,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400',
    product_type: 'Bevande'
  },
  {
    id: 7,
    name: 'Coca Cola',
    description: 'Lattina da 33cl',
    price: 250,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
    product_type: 'Bevande'
  },
  {
    id: 8,
    name: 'Acqua Naturale',
    description: 'Bottiglia da 50cl',
    price: 150,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    product_type: 'Bevande'
  }
];

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
  const productsToUse = (products.value && products.value.length > 0) ? products.value : exampleProducts;
  
  const grouped = productsToUse.reduce((acc, product) => {
    const category = product.product_type || 'Non specificata';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  Object.keys(grouped).forEach((category) => {
    grouped[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  groupedProducts.value = grouped;
};

if (ready.value)
  groupProductsByCategory();
else
  shopStore.initData(data.value.store, function () {
    groupProductsByCategory();
  });
</script>
