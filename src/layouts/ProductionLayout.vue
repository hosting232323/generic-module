<template>
  <v-app>
    <AppBar :ourSite="true" />
    <View />
  </v-app>
</template>

<script setup>
  import View from './View.vue';
  import AppBar from './OurAppBar.vue';

  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  initData();
</script>
