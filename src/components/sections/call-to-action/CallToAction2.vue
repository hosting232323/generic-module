<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="cta-card" elevation="8">
          <v-row no-gutters>
            <v-col cols="12" md="8" class="cta-content">
              <v-card-text class="pa-8">
                <v-chip v-if="content?.badge" color="primary" size="small" class="mb-4">{{ getText(content.badge) }}</v-chip>
                <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info?.title) }}</h2>
                <p class="text-h6 text-medium-emphasis mb-6">{{ getText(info?.subtitle) }}</p>
                <div class="d-flex gap-3 flex-wrap">
                  <v-btn v-for="(button, index) in content?.buttons" :key="index" :color="button.color || 'primary'" :variant="button.variant || 'flat'" size="large" @click="handleAction(button)">
                    {{ getText(button.text) }}
                    <v-icon v-if="button.icon" end>{{ button.icon }}</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4" class="cta-visual">
              <div class="cta-pattern"></div>
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
  content: Object,
  info: Object
});

const { getText } = useLanguageStore();

const handleAction = (button) => {
  if (button.link) window.open(button.link, '_blank');
};
</script>

<style scoped>
.cta-card {
  border-radius: 16px;
  overflow: hidden;
}

.cta-visual {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  position: relative;
}

.cta-pattern {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.gap-3 {
  gap: 12px;
}
</style>
