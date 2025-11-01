<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div v-for="(item, index) in content" :key="index" class="timeline-step">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-date">{{ getText(item.date) }}</div>
            <h4 class="text-h5 font-weight-bold mb-2">{{ getText(item.title) }}</h4>
            <p class="text-body-1">{{ getText(item.description) }}</p>
            <v-chip v-if="item.tag" size="small" :color="item.color || 'primary'" class="mt-2">
              {{ getText(item.tag) }}
            </v-chip>
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
.timeline-step {
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 31px;
  top: 64px;
  width: 2px;
  height: calc(100% + 16px);
  background: rgba(var(--v-theme-primary), 0.3);
}

.step-number {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.4);
}

.step-content {
  flex: 1;
  padding-top: 8px;
}

.step-date {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-bottom: 8px;
}
</style>
