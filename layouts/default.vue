<template>
  <v-app>
    <LayoutUpArrow />
    <LayoutAppBar />
    <Nuxt />
    <LayoutFooter />
  </v-app>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { useDataStore } from '@/store/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  const route = useRoute();
  initData(route.params.id);
</script>
