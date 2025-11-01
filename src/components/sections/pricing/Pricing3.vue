<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="(plan, index) in content" :key="index" cols="12" md="6">
        <v-card class="pricing-horizontal" elevation="2" :class="{ 'featured': plan.featured }">
          <v-row no-gutters>
            <v-col cols="12" sm="5" class="plan-info">
              <div class="pa-6">
                <h3 class="text-h4 font-weight-bold mb-2">{{ getText(plan.name) }}</h3>
                <p v-if="plan.description" class="text-body-2 mb-4">{{ getText(plan.description) }}</p>
                <div class="price-box">
                  <span class="currency">{{ plan.currency || '€' }}</span>
                  <span class="price">{{ plan.price }}</span>
                  <span class="period">/{{ getText(plan.period || { en: 'mo', it: 'mese' }) }}</span>
                </div>
                <v-btn :color="plan.featured ? 'primary' : 'default'" variant="flat" block class="mt-4" @click="handleAction(plan)">
                  {{ getText(plan.buttonText || { en: 'Subscribe', it: 'Abbonati' }) }}
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="7" class="features-list">
              <div class="pa-6">
                <v-chip v-for="(feature, i) in plan.features" :key="i" class="ma-1" color="primary" variant="outlined" size="small">
                  <v-icon start size="x-small">mdi-check</v-icon>
                  {{ getText(feature) }}
                </v-chip>
              </div>
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

const handleAction = (plan) => {
  if (plan.link) window.open(plan.link, '_blank');
};
</script>

<style scoped>
.pricing-horizontal {
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.pricing-horizontal:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

.pricing-horizontal.featured {
  border: 2px solid rgb(var(--v-theme-primary));
}

.plan-info {
  background: rgba(var(--v-theme-primary), 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.currency {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.period {
  font-size: 1rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.features-list {
  display: flex;
  align-items: center;
}
</style>
