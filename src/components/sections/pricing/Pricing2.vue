<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-table class="pricing-table">
          <thead>
            <tr>
              <th class="feature-column">{{ getText({ en: 'Features', it: 'Caratteristiche' }) }}</th>
              <th v-for="(plan, index) in content" :key="index" class="plan-column text-center">
                <div class="plan-header">
                  <div class="plan-name">{{ getText(plan.name) }}</div>
                  <div class="plan-price">
                    <span class="price">{{ getText(plan.price) }}</span>
                  </div>
                  <div v-if="plan.description" class="plan-description">{{ getText(plan.description) }}</div>
                  <v-btn :color="plan.highlighted ? 'primary' : 'default'" variant="flat" size="small" class="mt-2" @click="handleAction(plan)">
                    {{ getText(plan.buttonText || { it: 'Scegli', gb: 'Choose' }) }}
                  </v-btn>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(feature, i) in allFeatures" :key="i">
              <td class="feature-name">{{ getText(feature) }}</td>
              <td v-for="(plan, index) in content" :key="index" class="text-center">
                <v-icon v-if="planHasFeature(plan, feature)" color="success">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useLanguageStore } from '@/stores/language';

const props = defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const allFeatures = computed(() => {
  const features = new Set();
  props.content?.forEach(plan => {
    plan.features?.forEach(f => features.add(JSON.stringify(f)));
  });
  return Array.from(features).map(f => JSON.parse(f));
});

const planHasFeature = (plan, feature) => {
  return plan.features?.some(f => getText(f) === getText(feature));
};

const handleAction = (plan) => {
  if (plan.link) window.open(plan.link, '_blank');
};
</script>

<style scoped>
.pricing-table {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  overflow: hidden;
}

.pricing-table thead {
  background: rgba(var(--v-theme-primary), 0.05);
}

.pricing-table th {
  padding: 24px 16px;
  font-weight: 600;
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.12);
}

.pricing-table td {
  padding: 16px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.pricing-table tbody tr:hover {
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.feature-column {
  min-width: 200px;
}

.plan-column {
  min-width: 150px;
}

.plan-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.plan-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}

.currency {
  font-size: 1rem;
  color: rgb(var(--v-theme-primary));
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.feature-name {
  font-weight: 500;
}
</style>
