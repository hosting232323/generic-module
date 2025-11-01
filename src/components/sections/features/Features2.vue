<template>
  <v-container class="features-section py-16">
    <v-row v-if="content.title" justify="center" class="mb-12">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4 animate-fade-in" :style="{ color: info.primaryColor }">
          {{ getText(content.title) }}
        </h2>
        <div class="title-underline" :style="{ background: `linear-gradient(90deg, transparent, ${info.primaryColor}, transparent)` }"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(feature, index) in content.features"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        class="feature-col"
        :class="`animate-fade-in-delay-${(index % 3)}`"
      >
        <v-card class="feature-card h-100" elevation="0">
          <div class="feature-icon-wrapper">
            <div class="icon-background" :style="{ borderColor: info.primaryColor }">
              <v-avatar :color="info.primaryColor" size="70" class="feature-avatar">
                <v-icon :icon="feature.icon" size="35" color="white"/>
              </v-avatar>
            </div>
          </div>
          <v-card-title class="text-h5 text-center mb-3" :style="{ color: info.primaryColor }">
            <b v-html="getText(feature.name)"/>
          </v-card-title>
          <v-card-text class="text-center feature-description">
            {{ getText(feature.description) }}
          </v-card-text>
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
.features-section {
  position: relative;
}

.title-underline {
  width: 200px;
  height: 4px;
  margin: 20px auto 0;
  border-radius: 2px;
}

.feature-col {
  padding: 15px;
}

.feature-card {
  padding: 40px 30px;
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, transparent, var(--v-theme-primary), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 45px rgba(214, 52, 71, 0.2);
  border-color: currentColor;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.icon-background {
  padding: 8px;
  border-radius: 50%;
  border: 3px dashed;
  animation: rotate 20s linear infinite;
}

.feature-avatar {
  transition: all 0.3s ease;
}

.feature-card:hover .feature-avatar {
  transform: scale(1.1) rotate(5deg);
}

.feature-description {
  line-height: 1.7;
  color: #666;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-delay-0 {
  animation: fadeIn 0.8s ease-out 0.1s forwards;
  opacity: 0;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.5s forwards;
  opacity: 0;
}
</style>
