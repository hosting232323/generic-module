<template>
  <v-footer elevation="2" :color="data.info.primaryColor">
    <v-container style="text-align: center;">
      {{ new Date().getFullYear() }} —
      <strong>{{ data.info.name }}</strong>
      <div v-if="data.info.iva">P. IVA {{ data.info.iva }}</div>
      <div>
        Powered by 
        <a href="https://fastsite.it" class="fast-site-link" target="_blank">
          Fast-Site
          <v-icon right>mdi-web</v-icon>
        </a>
      </div>
    </v-container>
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
