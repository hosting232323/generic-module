<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri piani'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(plan, index) in content.plans"
        :key="index"
        cols="12"
        :md="content.columns || 4"
      >
        <v-card
          elevation="20"
          :class="{ 'featured-plan': plan.featured }"
          class="pricing-card h-100"
        >
          <v-card-title class="text-center text-h5 py-6" :style="{ backgroundColor: plan.featured ? info.primaryColor : 'transparent', color: plan.featured ? '#FFFFFF' : 'inherit' }">
            <span v-html="getText(plan.name)"/>
          </v-card-title>
          <v-card-text class="text-center">
            <div class="pricing-amount my-6">
              <span class="text-h3 font-weight-bold" :style="{ color: info.primaryColor }">{{ plan.price }}</span>
              <span v-if="plan.period" class="text-subtitle-1" v-html="'/' + getText(plan.period)"/>
            </div>
            <v-list density="compact">
              <v-list-item
                v-for="(feature, idx) in plan.features"
                :key="idx"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-check-circle" :color="info.primaryColor" size="20"/>
                </template>
                <v-list-item-title v-html="getText(feature)"/>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="justify-center pb-6">
            <v-btn
              :color="info.primaryColor"
              size="large"
              :variant="plan.featured ? 'flat' : 'outlined'"
              :href="plan.url"
              v-html="getText(plan.button) || getText('Scegli')"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.pricing-card {
  transition: transform 0.3s ease;
  position: relative;
}
.pricing-card:hover {
  transform: translateY(-10px);
}
.featured-plan {
  border: 3px solid;
}
.pricing-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
}
.h-100 {
  height: 100%;
}
</style>
