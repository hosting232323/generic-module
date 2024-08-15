<template>
  <v-container>
    <a :href="site.link">
      <v-card class="site-card pulsating-card">
        <v-card-title class="pulsating-card-item">
          {{ site.name }}
          <v-avatar size="40" class="ml-2">
            <v-img :src="site.logo ? site.logo : '/logo.png'" />
          </v-avatar>
        </v-card-title>
      </v-card>
    </a>
  </v-container>
  <v-slide-group v-model="slideGroupIndex" style="margin-left: 15%;margin-right: 15%;">
    <v-slide-group-item v-for="(image, index) in duplicatedImages" :key="index">
      <v-img width="300" height="450" :src="image" />
    </v-slide-group-item>
  </v-slide-group>
</template>


<script setup>
  import { ref, computed } from 'vue';

  const { site } = defineProps(['site']);

  const duplicatedImages = computed(() => {
    return Array(9).fill(site.images).flat();
  });

  const slideGroupIndex = ref(0);
</script>

<style scoped>
  .site-card {
    z-index: 99;
    position: absolute;
    max-width: 500px;
    transition: opacity 0.5s ease;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  .pulsating-card {
    animation: pulse 2s infinite;
  }
  .pulsating-card-item {
    color: #000000;
  }

  .pulsating-card:hover {
    background-color: #E73C1D;
    animation:none;
  }
  .pulsating-card-item:hover {
    color: #ffffff;
    animation:none;
  }
</style>

