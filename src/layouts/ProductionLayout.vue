<template>
  <v-app>
    <AppBar />
    <View />
    <Footer />
  </v-app>
</template>

<script setup>
  import View from './View.vue';
  import AppBar from './AppBar.vue';
  import Footer from './Footer.vue';

  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  initData();
</script>
