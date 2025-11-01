<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in content" :key="index" cols="12" md="6">
        <v-card class="faq-card" elevation="0" :ripple="false">
          <v-card-text class="pa-6">
            <v-avatar color="primary" size="48" class="mb-4">
              <v-icon color="white">mdi-frequently-asked-questions</v-icon>
            </v-avatar>
            <h4 class="text-h6 font-weight-bold mb-3">{{ getText(item.question) }}</h4>
            <p class="text-body-2">{{ getText(item.answer) }}</p>
          </v-card-text>
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
.faq-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
  height: 100%;
}

.faq-card:hover {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 4px 20px rgba(var(--v-theme-primary), 0.1);
}
</style>
