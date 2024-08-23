<template>
  <v-app>
    <View />
  </v-app>
</template>

<script setup>
  import View from './View.vue';

  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  initData();
</script>
