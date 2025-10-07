<template>
  <v-container
    fluid
    class="background"
  >
    <h1
      class="text-9xl font-weight-bold mb-4"
      :style="{ color: info.primaryColor }"
    >
      404
    </h1>

    <h2 class="text-h4-responsive font-weight-medium mb-2">
      Oops! Pagina non trovata
    </h2>
    <p class="text-subtitle-responsive">
      La pagina che stai cercando non esiste o è stata spostata.
    </p>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;
</script>

<style scoped>
.background {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.text-9xl {
  font-size: clamp(5rem, 20vw, 12rem);
  line-height: 1;
}
.text-h4-responsive {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  line-height: 1.2;
}

.text-subtitle-responsive {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.4;
}
</style>
