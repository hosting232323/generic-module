<template>
  <v-container fluid class="background">
    <h1 class="text-9xl font-weight-bold mb-4" :style="{ color: info.primaryColor }">YEAH!</h1>

    <h2 class="text-h4-responsive font-weight-medium mb-2">
      Pagamento completato!
    </h2>
    <a href="/" class="text-subtitle-responsive" :style="{ color: info.primaryColor }">Torna alla home</a>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';

const dataStore = useDataStore();
const orderStore = useOrderStore();

const { data } = storeToRefs(dataStore);
const info = data.value.info;

orderStore.removeAllProduct();
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
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  display: inline-block;
  font-style: italic;
}

.text-subtitle-responsive::after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}

.text-subtitle-responsive:hover::after {
  width: 100%;
  left: 0;
  transform: none;
}
</style>
