<template>
  <v-app>
    <template v-if="ready">
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
  import AppBar from './AppBar';
  import Footer from './Footer';
  import Loading from './Loading';

  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  const { ready } = storeToRefs(dataStore);
  const route = useRoute();

  initData(route.params.id);
</script>
