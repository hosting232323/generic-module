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

  import { onMounted  } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDataStore } from '@/stores/data';

  const route = useRoute();
  const dataStore = useDataStore();

  onMounted(() => {
    const routeId = route.params.id;
    if (routeId) {
      dataStore.initData(routeId);
    } else {
      dataStore.initData();
    }
  });
</script>
