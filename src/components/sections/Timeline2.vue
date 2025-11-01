<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="horizontal-timeline">
          <div v-for="(item, index) in content" :key="index" class="timeline-item-h">
            <div class="timeline-content-h">
              <v-card class="timeline-card-h" elevation="2">
                <v-card-text class="pa-6">
                  <v-avatar v-if="item.icon" :color="item.color || 'primary'" size="48" class="mb-4">
                    <v-icon :icon="item.icon" color="white"></v-icon>
                  </v-avatar>
                  <div class="timeline-date-h">{{ getText(item.date) }}</div>
                  <h4 class="text-h6 font-weight-bold mb-2">{{ getText(item.title) }}</h4>
                  <p class="text-body-2">{{ getText(item.description) }}</p>
                </v-card-text>
              </v-card>
            </div>
            <div class="timeline-dot-h" :style="{ background: item.color || 'rgb(var(--v-theme-primary))' }"></div>
            <div v-if="index < content.length - 1" class="timeline-line-h"></div>
          </div>
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
.horizontal-timeline {
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 40px 0;
  gap: 0;
}

.timeline-item-h {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  position: relative;
}

.timeline-content-h {
  margin-bottom: 40px;
}

.timeline-card-h {
  width: 280px;
  transition: transform 0.3s;
}

.timeline-card-h:hover {
  transform: scale(1.05);
}

.timeline-dot-h {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.timeline-line-h {
  position: absolute;
  width: 300px;
  height: 2px;
  background: rgba(var(--v-theme-on-surface), 0.2);
  top: 50%;
  left: 140px;
  z-index: 1;
}

.timeline-date-h {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 8px;
}
</style>
