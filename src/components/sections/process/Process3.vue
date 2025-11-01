<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(step, index) in content" :key="index" cols="12">
        <v-card :class="['process-card-alt', index % 2 === 0 ? 'left' : 'right']" elevation="2">
          <v-row no-gutters :class="{ 'flex-row-reverse': index % 2 !== 0 }">
            <v-col cols="12" md="4" class="process-visual" :style="{ background: step.color || 'rgb(var(--v-theme-primary))' }">
              <div class="process-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
              <v-icon v-if="step.icon" :icon="step.icon" size="64" color="white"></v-icon>
            </v-col>
            <v-col cols="12" md="8" class="process-text">
              <v-card-text class="pa-8">
                <h4 class="text-h4 font-weight-bold mb-4">{{ getText(step.title) }}</h4>
                <p class="text-h6 text-medium-emphasis">{{ getText(step.description) }}</p>
              </v-card-text>
            </v-col>
          </v-row>
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
.process-card-alt {
  margin-bottom: 32px;
  overflow: hidden;
  transition: transform 0.3s;
}

.process-card-alt:hover {
  transform: scale(1.02);
}

.process-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  position: relative;
}

.process-number {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 4rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.2);
  line-height: 1;
}

.process-text {
  display: flex;
  align-items: center;
}
</style>
