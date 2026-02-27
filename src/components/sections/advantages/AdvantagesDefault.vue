<template>
  <v-container>
    <h1
      :style="{ color: info.primaryColor }"
      v-html="getText(content.title) || 'I nostri vantaggi'"
    />
    <v-card
      v-for="(advantage, index) in content.advantages"
      :key="index"
      class="margin_top__default"
      elevation="20"
      :class="{ 'carousel--mobile': isMobile }"
    >
      <div :class="['img-wrapper', { 'mobile-height': isMobile }]">
        <v-carousel
          v-if="Array.isArray(advantage.image)"
          show-arrows
          hide-delimiters
          :height="isMobile ? '400px' : '600px'"
        >
          <v-carousel-item
            v-for="(img, imgIndex) in advantage.image"
            :key="imgIndex"
          >
            <img
              :src="resolveImg(img)"
              class="img"
            >
          </v-carousel-item>
        </v-carousel>
        <img
          v-else
          :src="resolveImg(advantage.image)"
          class="img"
        >
      </div>
      <v-card-title style="white-space: normal;">
        <span v-html="getText(advantage.name)" />
      </v-card-title>
      <v-card-text v-if="advantage.description">
        <div v-html="getText(advantage.description)" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { setupMobileUtils, resolveImg } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const isMobile = setupMobileUtils();
const { content, info } = defineProps({
  content: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.img-wrapper {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
}
.img-wrapper.mobile-height {
  height: 400px !important;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.carousel--mobile :deep(.v-btn.v-btn--icon) {
  width: 35px !important;
  height: 35px !important;
  font-size: 14px !important;
}
</style>
