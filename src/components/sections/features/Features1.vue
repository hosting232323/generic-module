<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor, textAlign: 'center' }" v-html="getText(content.title)"/>
    <v-row class="margin_top__default justify-center">
      <v-col
        v-for="(feature, index) in content.features"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 4"
      >
        <v-card elevation="15" class="feature-card-hover h-100 text-center pa-6" :style="{ borderTop: `5px solid ${info.primaryColor}` }">
          <v-avatar :color="info.primaryColor" size="80" class="mb-4">
            <v-icon :icon="feature.icon" size="40" color="white"/>
          </v-avatar>
          <h3 class="mb-4" :style="{ color: info.primaryColor }" v-html="getText(feature.name)"/>
          <p v-html="getText(feature.description)"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.feature-card-hover {
  transition: all 0.3s ease;
}
.feature-card-hover:hover {
  transform: translateY(-15px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}
.h-100 {
  height: 100%;
}
</style>
