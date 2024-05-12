<template>
  <v-container>
    <h1 :style="{ color: data.primaryColor }">
      I nostri servizi
    </h1>
    <v-expansion-panels multiple>
      <v-expansion-panel elevation="20" v-for="service in data.services" class="margin_top__default">
        <v-expansion-panel-title>
          <b>{{ service.name }}</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="service.description" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
