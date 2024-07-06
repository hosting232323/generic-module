<template>
  <v-app>
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

  import { useRoute } from 'vue-router';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  const route = useRoute();
  initData(route.params.id);
</script>
