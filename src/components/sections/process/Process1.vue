<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(step, index) in content" :key="index" cols="12" sm="6" md="3">
        <div class="process-step">
          <div class="step-number-circle">{{ index + 1 }}</div>
          <v-avatar v-if="step.icon" :color="step.color || 'primary'" size="64" class="mb-4">
            <v-icon :icon="step.icon" size="32" color="white"></v-icon>
          </v-avatar>
          <h4 class="text-h6 font-weight-bold mb-3">{{ getText(step.title) }}</h4>
          <p class="text-body-2">{{ getText(step.description) }}</p>
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
.process-step {
  text-align: center;
  padding: 32px 16px;
  position: relative;
}

.step-number-circle {
  position: absolute;
  top: 0;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
}
</style>
