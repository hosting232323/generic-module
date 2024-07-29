<template>
  <div style="position: relative;">
    <div
      :style="{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        zIndex: 1,
      }"
    >
      <h1 :style="{ fontSize: isMobile ? '20px' : '50px' }">DICARNESHOWROOM</h1>
    </div>
    <v-carousel delimiter-icon="mdi-square" hide-delimiters cycle interval="5000" :style="{height: isMobile ? '' : '100vh'}">
      <v-carousel-item v-for="slide in Object.keys(data.gallery)" :key="slide">
        <v-img :src="`${isMobile ? '/galleryCrop/' : '/gallery/'}${data.gallery[slide]}`" cover></v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import mobile from '@/utils/mobile';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  const isMobile = mobile.setupMobileUtils();
</script>
