<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="(stat, index) in content" :key="index" cols="12" sm="6" md="4">
        <v-card class="stat-card-modern" elevation="0" :style="{ borderColor: stat.color || 'rgb(var(--v-theme-primary))' }">
          <v-card-text class="pa-8">
            <v-avatar v-if="stat.icon" :color="stat.color || 'primary'" size="64" class="mb-4">
              <v-icon :icon="stat.icon" size="32" color="white"></v-icon>
            </v-avatar>
            <div class="stat-number-modern" :style="{ color: stat.color || 'rgb(var(--v-theme-primary))' }">
              {{ stat.value }}{{ stat.suffix || '' }}
            </div>
            <div class="stat-label-modern">{{ getText(stat.label) }}</div>
            <p v-if="stat.description" class="stat-desc">{{ getText(stat.description) }}</p>
          </v-card-text>
        </v-card>
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
.stat-card-modern {
  border-left: 4px solid;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
}

.stat-card-modern:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.stat-number-modern {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 12px;
}

.stat-label-modern {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-desc {
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
  margin-bottom: 0;
}
</style>
