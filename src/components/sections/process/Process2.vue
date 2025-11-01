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
        <div class="process-timeline">
          <div v-for="(step, index) in content" :key="index" class="process-item">
            <div class="process-connector" v-if="index < content.length - 1"></div>
            <div class="process-marker" :style="{ background: step.color || 'rgb(var(--v-theme-primary))' }">
              <v-icon v-if="step.icon" :icon="step.icon" color="white"></v-icon>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="process-content-card">
              <v-card elevation="2">
                <v-card-text class="pa-6">
                  <h4 class="text-h5 font-weight-bold mb-3">{{ getText(step.title) }}</h4>
                  <p class="text-body-1">{{ getText(step.description) }}</p>
                </v-card-text>
              </v-card>
            </div>
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
.process-timeline {
  position: relative;
}

.process-item {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
  position: relative;
}

.process-marker {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.process-connector {
  position: absolute;
  left: 39px;
  top: 80px;
  width: 2px;
  height: 100%;
  background: rgba(var(--v-theme-on-surface), 0.2);
  z-index: 1;
}

.process-content-card {
  flex: 1;
}

.process-content-card .v-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.process-item:hover .process-content-card .v-card {
  transform: translateX(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
}
</style>
