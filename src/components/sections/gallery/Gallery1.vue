<template>
  <v-container>
    <h1 v-if="content.title" :style="{ color: info.primaryColor, textAlign: 'center' }" v-html="getText(content.title)"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(image, index) in content.images"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 4"
      >
        <v-card elevation="10" class="gallery-card" @click="openImage(image)">
          <v-img
            :src="resolveImg(image)"
            :height="isMobile ? 250 : 350"
            cover
            class="gallery-image"
          >
            <div class="gallery-overlay">
              <v-icon icon="mdi-magnify-plus" size="50" color="white"/>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const openImage = (image) => {
  window.open(resolveImg(image), '_blank');
};
</script>

<style scoped>
.gallery-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: hidden;
}
.gallery-card:hover {
  transform: scale(1.05);
}
.gallery-card:hover .gallery-overlay {
  opacity: 1;
}
.gallery-image {
  transition: transform 0.3s ease;
}
.gallery-card:hover .gallery-image {
  transform: scale(1.1);
}
.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
