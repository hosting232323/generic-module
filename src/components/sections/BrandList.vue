<template>
  <v-container>
    <v-slide-group :show-arrows="!isMobile">
      <v-slide-group-item v-for="(brand, index) in content.brands" :key="index">
        <v-card
          :height="isMobile ? 150 : 300"
          :width="isMobile ? 150 : 300"
          class="brand_item"
        >
          <v-img :src="brand" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup>
import { setupMobileUtils } from '@/utils/mobile';

const isMobile = setupMobileUtils()
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.brand_item {
  margin-right: 25px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
