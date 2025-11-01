<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="(plan, index) in content" :key="index" cols="12" sm="6" md="4">
        <v-card :class="['pricing-card', { 'featured': plan.featured }]" elevation="2">
          <div v-if="plan.featured" class="featured-badge">{{ getText({ en: 'Popular', it: 'Popolare' }) }}</div>
          <v-card-title class="text-center text-h5 py-6">{{ getText(plan.name) }}</v-card-title>
          <v-card-text class="text-center pb-0">
            <div class="price-container">
              <span class="currency">{{ plan.currency || '€' }}</span>
              <span class="price">{{ plan.price }}</span>
              <span class="period">/{{ getText(plan.period || { en: 'month', it: 'mese' }) }}</span>
            </div>
            <p v-if="plan.description" class="text-medium-emphasis mt-4">{{ getText(plan.description) }}</p>
          </v-card-text>
          <v-divider class="my-4"></v-divider>
          <v-card-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item v-for="(feature, i) in plan.features" :key="i" class="px-0">
                <template v-slot:prepend>
                  <v-icon color="success" size="small">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title class="text-wrap">{{ getText(feature) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="pa-6 pt-0">
            <v-btn :color="plan.featured ? 'primary' : 'default'" variant="flat" block size="large" @click="handleAction(plan)">
              {{ getText(plan.buttonText || { en: 'Get Started', it: 'Inizia' }) }}
            </v-btn>
          </v-card-actions>
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

const handleAction = (plan) => {
  if (plan.link) window.open(plan.link, '_blank');
};
</script>

<style scoped>
.pricing-card {
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.pricing-card.featured {
  border: 2px solid rgb(var(--v-theme-primary));
}

.featured-badge {
  position: absolute;
  top: 0;
  right: 20px;
  background: rgb(var(--v-theme-primary));
  color: white;
  padding: 8px 20px;
  border-radius: 0 0 8px 8px;
  font-weight: 600;
  font-size: 0.875rem;
}

.price-container {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.currency {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(var(--v-theme-primary));
}

.price {
  font-size: 3.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  line-height: 1;
}

.period {
  font-size: 1.2rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
}
</style>
