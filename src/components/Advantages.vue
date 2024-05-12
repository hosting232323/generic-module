<template>
  <v-container>
    <h1 :style="{ color: data.primaryColor }">
      I nostri vantaggi
    </h1>
    <v-card elevation="20" v-for="advantage in data.advantages" class="margin_top__default">
      <v-img :src="advantage.image" style="max-height: 600px;" cover />
      <v-card-title style="white-space: normal;">
        {{ advantage.name }}
      </v-card-title>
      <v-card-text v-if="advantage.description">
        <div v-html="advantage.description" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
