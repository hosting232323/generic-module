<template class="app-bar">
  <v-app-bar v-if="!isMobile" :elevation="2" :color="data.info.primaryColor">
    <v-spacer />
    <v-btn variant="text" class="desktop-menu" href="/#whoweare" text="Chi siamo" />
    <v-btn variant="text" class="desktop-menu" href="/#brandlist" text="Brandlist" />
    <v-btn variant="text" class="desktop-menu" href="/#advantages" text="Valori" />
    <v-btn variant="text" class="desktop-menu" href="/#contacts" text="Contatti" />
    <v-spacer />
  </v-app-bar>
</template>

<script setup>
  import mobile from '@/utils/mobile';
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const isMobile = mobile.setupMobileUtils();

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>

<style scoped>
  .desktop-menu {
    padding-right: 20px;
  }
  .router-link-exact-active,
  .router-link-active,
  .router-link-exact-active a {
    text-decoration: none;
    color: inherit;
  }
  .router-link:hover {
    text-decoration: underline;
  }
</style>
