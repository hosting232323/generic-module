<template>
  <v-container fluid class="stats-container" :style="getGradientStyle()">
    <v-container>
      <v-row v-if="info?.title" justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4 text-white">{{ getText(info.title) }}</h2>
          <p v-if="info.subtitle" class="text-h6 text-white">{{ getText(info.subtitle) }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(stat, index) in content" :key="index" cols="12" sm="6" md="3">
          <div class="stat-box">
            <div class="stat-value">{{ stat.value }}{{ stat.suffix || '' }}</div>
            <v-divider class="my-3 stat-divider"></v-divider>
            <div class="stat-title">{{ getText(stat.label) }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const props = defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const adjustColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
};

const getGradientStyle = () => {
  return {
    background: `linear-gradient(135deg, ${props.info.primaryColor} 0%, ${adjustColor(props.info.primaryColor, -15)} 100%)`
  };
};
</script>

<style scoped>
.stats-container {
  padding: 80px 0;
}

.stat-box {
  text-align: center;
  padding: 24px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s, background 0.3s;
}

.stat-box:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.15);
}

.stat-value {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.stat-divider {
  border-color: rgba(255, 255, 255, 0.5);
  max-width: 60px;
  margin-left: auto;
  margin-right: auto;
}

.stat-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
