<template>
  <v-app  v-if="dataStore.ready">
    <UpArrow />
    <AppBar />
    <View /> 
    <Footer />
  </v-app>
</template>

<script setup>
  import UpArrow from './UpArrow.vue';
  import View from './View.vue';
  import AppBar from './AppBar.vue';
  import Footer from './Footer.vue';

  import { useDataStore } from '@/stores/data';
  const dataStore = useDataStore();

  const query = new URLSearchParams(window.location.search);
  const routeId = query.get('id');

  if (routeId) {
    dataStore.initData(routeId);
  } else {
    dataStore.initData();
  }
</script>
