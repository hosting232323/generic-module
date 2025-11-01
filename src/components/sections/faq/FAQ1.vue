<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(item, index) in content" :key="index">
            <v-expansion-panel-title class="text-h6">
              <v-icon start color="primary">mdi-help-circle</v-icon>
              {{ getText(item.question) }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-1 pt-4">{{ getText(item.answer) }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
</style>
