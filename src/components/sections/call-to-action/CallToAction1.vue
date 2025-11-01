<template>
  <v-container fluid class="cta-container">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="text-h2 font-weight-bold text-white mb-6">{{ getText(info?.title) }}</h2>
          <p class="text-h5 text-white mb-8">{{ getText(info?.subtitle) }}</p>
          <div class="d-flex justify-center gap-4 flex-wrap">
            <v-btn v-for="(button, index) in content?.buttons" :key="index" :color="button.color || 'white'" :variant="button.variant || 'flat'" size="x-large" @click="handleAction(button)">
              {{ getText(button.text) }}
              <v-icon v-if="button.icon" end>{{ button.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

defineProps({
  content: Object,
  info: Object
});

const { getText } = useLanguageStore();

const handleAction = (button) => {
  if (button.link) window.open(button.link, '_blank');
};
</script>

<style scoped>
.cta-container {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
}

.cta-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.5;
}

.gap-4 {
  gap: 16px;
}
</style>
