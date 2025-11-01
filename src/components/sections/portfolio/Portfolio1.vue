<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in content" :key="index" cols="12" sm="6" md="4">
        <v-card class="portfolio-card" elevation="2" @click="handleClick(item)">
          <v-img :src="resolveImg(item.image)" :aspect-ratio="16/9" cover>
            <div class="portfolio-overlay">
              <v-icon size="48" color="white">mdi-eye</v-icon>
            </div>
          </v-img>
          <v-card-text class="pa-6">
            <v-chip v-if="item.category" size="small" color="primary" variant="outlined" class="mb-2">
              {{ getText(item.category) }}
            </v-chip>
            <h4 class="text-h6 font-weight-bold mb-2">{{ getText(item.title) }}</h4>
            <p class="text-body-2">{{ getText(item.description) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const handleClick = (item) => {
  if (item.link) window.open(item.link, '_blank');
};
</script>

<style scoped>
.portfolio-card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
}

.portfolio-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--v-theme-primary), 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
