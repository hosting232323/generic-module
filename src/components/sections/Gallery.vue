<template>
  <v-carousel :height="isMobile ? 400 : 600" delimiter-icon="mdi-square">
    <v-carousel-item v-for="slide in content">
      <v-img :src="slide" cover />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  import { useMobileUtils } from '@/utils/mobile';
  const { isMobile } = useMobileUtils();

  const { content } = defineProps(['content']);
</script>
