<template>
  <v-footer elevation="2" :color="data.primaryColor">
    <v-row no-gutters>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>{{ data.name }}</strong>
        <div v-if="data.iva">P. IVA {{ data.iva }}</div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
