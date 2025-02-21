<template>
  <v-footer elevation="2" :color="data.info.primaryColor">
    <v-row no-gutters>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Di Carne Antonio</strong>
        <div v-if="data.info.iva">P. IVA {{ data.info.iva }}</div>
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

<style scoped>
.footer-link {
  color: #42b983;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}

.fast-site-link {
  color: #42b983;
  font-weight: bold;
  transition: color 0.3s ease;
}

.fast-site-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}
</style>
