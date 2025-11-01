<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(stat, index) in content" :key="index" cols="6" sm="6" md="3">
        <div class="stat-card">
          <v-icon v-if="stat.icon" :icon="stat.icon" size="48" color="primary" class="mb-4"></v-icon>
          <div class="stat-number">{{ stat.value }}{{ stat.suffix || '' }}</div>
          <div class="stat-label">{{ getText(stat.label) }}</div>
          <p v-if="stat.description" class="stat-description">{{ getText(stat.description) }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();
</script>

<style scoped>
.stat-card {
  text-align: center;
  padding: 32px 16px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-8px);
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  color: rgb(var(--v-theme-primary));
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1.125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.stat-description {
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-top: 8px;
  margin-bottom: 0;
}
</style>
