<template>
  <v-carousel :height="mobile.setupMobileUtils().value ? 400 : 600" delimiter-icon="mdi-square">
    <v-carousel-item v-for="slide in Object.keys(data.gallery)">
      <v-img :src="data.gallery[slide]" cover />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import mobile from '@/utils/mobile';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
