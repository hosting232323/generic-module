<template>
  <v-main :style="{ backgroundColor: data.secondaryColor }">
    <router-view />
  </v-main>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
