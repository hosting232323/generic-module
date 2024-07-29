<template>
  <v-container>
    <v-row align="center">
      <v-col v-if="isLeftAligned" cols="12" md="6">
        <v-img :src="data.dualSection4.image" cover />
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet :color = "data.secondaryColor">
          <h1 :style="{ color: data.primaryColor + ' !important' }">
            {{ data.dualSection4.title }}
          </h1><br>
          <v-typography v-if="data.dualSection4.description" v-html="data.dualSection4.description" class="black" />
          <br>
          <a :href="data.dualSection4.url" v-if="data.dualSection4.url && data.dualSection4.button">
            <v-btn
              v-html="data.dualSection4.button" 
              class="text-none"
              variant="flat"
              :color="data.primaryColor"
              :style="{ marginTop: '7px' }">
            </v-btn>
          </a>
        </v-sheet>
      </v-col>
      <v-col v-if="!isLeftAligned" cols="12" md="6">
        <v-img :src="data.dualSection4.image" cover />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const defaultOrientation = 'right';
  const isLeftAligned = computed(() => (data.value.dualSection4.orientation || defaultOrientation) === 'left');
</script>
