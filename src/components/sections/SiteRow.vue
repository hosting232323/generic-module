<template>
  <a :href="site.link">
    <v-card class="site-card">
      <v-card-title>
        {{ site.name }}
        <v-avatar size="40" class="ml-2">
          <v-img :src="site.logo ? site.logo : '/logo.png'" />
        </v-avatar>
      </v-card-title>
    </v-card>
  </a>
  <v-slide-group v-model="slideGroupIndex">
    <v-slide-group-item v-for="(image, index) in duplicatedImages" :key="index">
      <v-img width="750" height="750" :src="image" />
    </v-slide-group-item>
  </v-slide-group>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const { site } = defineProps(['site']);

  const duplicatedImages = computed(() => {
    return Array(9).fill(site.images).flat();
  });

  const slideGroupIndex = ref(site.images.length * 4);
</script>

<style scoped>
  .site-card {
    z-index: 99;
    margin-left: 50px;
    margin-top: 50px;
    position: absolute;
    max-width: 500px;
  }
</style>
