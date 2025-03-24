<template>
  <v-app>
    <template v-if="ready">
      <UpArrow />
      <AppBar />
      <View />
      <Footer />
    </template>
    <template v-else>
      <Loading />
    </template>
  </v-app>
</template>

<script setup>
  import View from './View';
  import Footer from './Footer';
  import UpArrow from './UpArrow';
  import Loading from './Loading';
  import AppBar from './DemoAppBar';

  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  const { ready } = storeToRefs(dataStore);
  const route = useRoute();

  initData(route.params.id);
</script>
