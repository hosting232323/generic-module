<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Le nostre caratteristiche'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(feature, index) in content.features"
        :key="index"
        cols="12"
        :md="content.columns || 4"
      >
        <v-card elevation="10" class="feature-card h-100">
          <v-card-text class="text-center">
            <v-icon
              :icon="feature.icon"
              :color="info.primaryColor"
              size="60"
              class="mb-4"
            />
            <h3 class="mb-3" v-html="getText(feature.name)"/>
            <p v-html="getText(feature.description)"/>
          </v-card-text>
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
.feature-card {
  transition: transform 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-10px);
}
.h-100 {
  height: 100%;
}
</style>
