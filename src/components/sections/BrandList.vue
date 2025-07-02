<template>
  <v-container>
    <v-slide-group show-arrows>
      <template #prev>
          <v-icon>mdi-chevron-left</v-icon>
      </template>
      <template #next>
          <v-icon>mdi-chevron-right</v-icon>
      </template>
      <v-slide-group-item v-for="(brand, index) in content.brands" :key="index">
        <v-card
          :height="isMobile ? 150 : 300"
          :width="isMobile ? 150 : 300"
          style="margin-right: 20px; border: 0px;"
        >
          <v-img :src="brand" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup>
import { setupMobileUtils } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { content, info } = defineProps(['content', 'info']);
</script>
