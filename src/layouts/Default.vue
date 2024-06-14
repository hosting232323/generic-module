<template>
  <v-app>
    <default-UpArrow />
    <default-bar />
    <default-view />
    <default-footer />
  </v-app>
</template>

<script setup>
  import DefaultUpArrow from './UpArrow.vue';
  import DefaultView from './View.vue';
  import DefaultBar from './AppBar.vue';
  import DefaultFooter from './Footer.vue';

  import { useRoute } from 'vue-router';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  const route = useRoute();
  initData(route.params.id);
</script>
