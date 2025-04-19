<template>
  <v-carousel :height="isMobile ? 400 : 600" delimiter-icon="mdi-square">
    <v-carousel-item v-for="(slide, index) in content" :key="index">
      <v-img :src="resolveImg(slide)" cover />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  import { useMobileUtils } from '@/utils/mobile';
  const { isMobile } = useMobileUtils();

  const { content } = defineProps(['content']);

  const resolveImg = (slide) => {
    if (typeof slide === 'string') return slide;
    if (typeof slide === 'object') return isMobile ? slide.mobile : slide.desktop;
    return '';
  };
</script>
