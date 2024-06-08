<template>
  <v-carousel :height="mobile.setupMobileUtils().value ? 400 : 600" delimiter-icon="mdi-square">
    <v-carousel-item v-for="slide in content">
      <v-img :src="slide" cover />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  import mobile from '@/utils/mobile';

  const { content } = defineProps(['content']);
</script>
