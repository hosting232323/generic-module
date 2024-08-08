<template>
  <v-app>
    <AppBar />
    <View />
  </v-app>
</template>

<script setup>
  import View from './View.vue';
  import AppBar from './AppBar.vue';


  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  initData();
</script>
