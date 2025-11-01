<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-timeline side="end" align="start">
          <v-timeline-item v-for="(item, index) in content" :key="index" :dot-color="item.color || 'primary'" size="large">
            <template v-slot:icon>
              <v-icon v-if="item.icon" :icon="item.icon"></v-icon>
            </template>
            <template v-slot:opposite>
              <div class="timeline-date">{{ getText(item.date) }}</div>
            </template>
            <v-card class="timeline-card" elevation="2">
              <v-card-title>{{ getText(item.title) }}</v-card-title>
              <v-card-text>
                <p>{{ getText(item.description) }}</p>
                <v-chip v-if="item.tag" size="small" :color="item.color || 'primary'" variant="outlined" class="mt-2">
                  {{ getText(item.tag) }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
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
.timeline-date {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.timeline-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.timeline-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}
</style>
