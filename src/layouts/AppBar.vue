<template class="app-bar">

  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-list>
      <v-list-item v-for="item in items" :key="item.path">
        <div @click="link(item)">
          {{ item.title }}
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="isMobile">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-app-bar-title>
      <div v-if="info.logo" class="d-flex align-center">
        <img :src="info.logo" alt="Logo" class="app-logo">
        <b style="margin-left: 10px;">{{ info.name }}</b>
      </div>
      <b v-else>{{ info.name }}</b>
    </v-app-bar-title>
    <Cart v-if="cartActive && getCartQuantity != 0"></Cart>
  </v-app-bar>

  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="!isMobile">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <v-app-bar-title>
      <div v-if="info.logo" class="d-flex align-center">
        <img :src="info.logo" alt="Logo" class="app-logo">
        <b style="margin-left: 10px;">{{ info.name }}</b>
      </div>
      <b v-else>{{ info.name }}</b>
    </v-app-bar-title>

    <div class="desktop-menu">
      <v-btn v-for="item in items" :key="item.path" variant="text" @click="link(item)">
        {{ item.title }}
      </v-btn>
      <Cart v-if="cartActive && getCartQuantity != 0"></Cart>
    </div>
  </v-app-bar>

</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { useMobileUtils } from '@/utils/mobile';
import { useRouter, useRoute } from 'vue-router';

import Cart from './Cart.vue';

const orderStore = useOrderStore();

const drawer = ref(null);
const route = useRoute();
const router = ref(useRouter());

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;
const content = data.value.components;
const addOn = data.value.addOn;
const cartActive = addOn && addOn.includes('Shop');
const { isMobile } = useMobileUtils();

const link = (item) => {
  if (item.type == 'ancor') {
    const pathUrl = route.params.id ? `/demo/${route.params.id}` : '';
    router.value.push(`${pathUrl}/#${item.path}`);
  } else if (item.type == 'externalLink')
    window.open(item.path, '_blank');
  else if (item.type == 'internalLink')
    router.value.push(item.path);
}

const items = computed(() => {
  let menuItems = [];
  if (addOn && addOn.includes('VirtualTour'))
    menuItems.push({
      title: 'Virtual Tour',
      path: 'https://test-virtual-tour.replit.app/',
      type: 'externalLink'
    });
  if (addOn && addOn.includes('Blog'))
    menuItems.push({
      title: 'Blog',
      path: '/blog',
      type: 'internalLink'
    });
  menuItems = menuItems.concat(content
    .filter(section => section.menu)
    .map(section => ({
      title: section.menu,
      path: section.menu.toLowerCase(),
      type: 'ancor'
    })));
  return info.menuHomeLink ? [{ title: 'Home', path: '/', type: 'internalLink' }, ...menuItems] : menuItems;
});

const getCartQuantity = computed(() => {
  return orderStore.products.reduce((total, product) => total + product.quantity, 0);
});
</script>

<style scoped>
.app-logo {
  height: 40px;
  max-width: 150px;
}
</style>
