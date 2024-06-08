<template>
  <v-carousel :height="mobile.setupMobileUtils().value ? 250 : 850" delimiter-icon="mdi-square" hide-delimiters show-arrows="hover">
    <v-carousel-item v-for="slide in Object.keys(data.gallery)">
      <v-img :src="data.gallery[slide]" cover>
        <v-row :style="{ marginTop: !mobile ? '500px' : '70px' }">
          <v-col style="color: white; text-align: center;">
            <h1 :style="{ fontSize: !mobile ? '200px' : '40px' }">Di Carne</h1>
            <h2 :style="{ fontSize: !mobile ? '150px' : '20px' }">Show Room</h2>
          </v-col>
        </v-row>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import mobile from '@/utils/mobile';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
