<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="cta-banner">
          <div class="cta-banner-content">
            <h2 class="text-h4 font-weight-bold text-white mb-2">{{ getText(info?.title) }}</h2>
            <p class="text-body-1 text-white">{{ getText(info?.subtitle) }}</p>
          </div>
          <div class="cta-banner-action">
            <v-btn v-for="(button, index) in content?.buttons" :key="index" :color="button.color || 'white'" :variant="button.variant || 'flat'" size="large" @click="handleAction(button)">
              {{ getText(button.text) }}
              <v-icon v-if="button.icon" end>{{ button.icon }}</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
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
.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  padding: 48px 64px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  gap: 32px;
}

.cta-banner-content {
  flex: 1;
}

.cta-banner-action {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .cta-banner {
    flex-direction: column;
    text-align: center;
    padding: 32px;
  }
  
  .cta-banner-action {
    justify-content: center;
  }
}
</style>
