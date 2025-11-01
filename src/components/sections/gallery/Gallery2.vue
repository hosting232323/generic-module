<template>
  <v-container class="gallery-section py-16">
    <v-row v-if="content.title" justify="center" class="mb-12">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: info.primaryColor }">
          {{ getText(content.title) }}
        </h2>
        <div class="title-underline" :style="{ background: `linear-gradient(90deg, transparent, ${info.primaryColor}, transparent)` }"></div>
      </v-col>
    </v-row>
    <div class="masonry-grid">
      <div
        v-for="(image, index) in content.images"
        :key="index"
        class="masonry-item"
        @click="openImage(image)"
      >
        <v-card elevation="0" class="masonry-card">
          <div class="image-wrapper">
            <v-img
              :src="resolveImg(image)"
              :aspect-ratio="getRandomRatio()"
              cover
              class="gallery-image"
            />
            <div class="image-overlay" :style="{ background: `linear-gradient(0deg, ${info.primaryColor}DD 0%, transparent 100%)` }">
              <v-icon icon="mdi-magnify-plus-outline" size="50" color="white"/>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const ratios = [1, 1.3, 0.8, 1.5, 1.2];
let ratioIndex = 0;

const getRandomRatio = () => {
  const ratio = ratios[ratioIndex % ratios.length];
  ratioIndex++;
  return ratio;
};

const openImage = (image) => {
  window.open(resolveImg(image), '_blank');
};
</script>

<style scoped>
.gallery-section {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
}

.title-underline {
  width: 200px;
  height: 4px;
  margin: 20px auto 0;
  border-radius: 2px;
}

.masonry-grid {
  column-count: 3;
  column-gap: 20px;
}

@media (max-width: 960px) {
  .masonry-grid {
    column-count: 2;
  }
}

@media (max-width: 600px) {
  .masonry-grid {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  cursor: pointer;
}

.masonry-card {
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.masonry-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 45px rgba(214, 52, 71, 0.25);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.gallery-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.masonry-card:hover .gallery-image {
  transform: scale(1.1);
}

.masonry-card:hover .image-overlay {
  opacity: 1;
}
</style>
