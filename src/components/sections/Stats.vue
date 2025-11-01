<template>
  <v-container>
    <h1 v-if="content.title" :style="{ color: info.primaryColor }" v-html="getText(content.title)"/>
    <v-row class="margin_top__default text-center">
      <v-col
        v-for="(stat, index) in content.stats"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 3"
      >
        <v-card elevation="10" class="stat-card pa-6">
          <v-icon
            v-if="stat.icon"
            :icon="stat.icon"
            :color="info.primaryColor"
            size="50"
            class="mb-4"
          />
          <div class="stat-number text-h3 font-weight-bold mb-2" :style="{ color: info.primaryColor }">
            {{ animatedValue(stat.value, index) }}{{ stat.suffix || '' }}
          </div>
          <div class="stat-label text-subtitle-1" v-html="getText(stat.label)"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const animatedValues = ref(content.stats.map(() => 0));

const animatedValue = (target, index) => animatedValues.value[index];

onMounted(() => {
  content.stats.forEach((stat, index) => {
    const target = parseInt(stat.value);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        animatedValues.value[index] = target;
        clearInterval(interval);
      } else {
        animatedValues.value[index] = Math.floor(current);
      }
    }, duration / steps);
  });
});
</script>

<style scoped>
.stat-card {
  transition: transform 0.3s ease;
}
.stat-card:hover {
  transform: scale(1.05);
}
</style>
