<template>
  <v-container fluid class="pa-0">
    <h1 v-if="content.title" :style="{ color: info.primaryColor, textAlign: 'center' }" class="pa-4" v-html="getText(content.title)"/>
    <v-carousel
      :height="isMobile ? 500 : 700"
      hide-delimiter-background
      show-arrows="hover"
      cycle
      :interval="4000"
    >
      <v-carousel-item
        v-for="(image, index) in content.images"
        :key="index"
      >
        <v-img :src="resolveImg(image)" cover height="100%">
          <div class="carousel-caption" v-if="content.captions && content.captions[index]">
            <h2 v-html="getText(content.captions[index])"/>
          </div>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.carousel-caption {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
}
.carousel-caption h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}
</style>
