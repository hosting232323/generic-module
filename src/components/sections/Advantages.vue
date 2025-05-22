<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      {{ getText(content.title) || 'I nostri vantaggi' }}
    </h1>
    <v-card v-for="(advantage, index) in content.advantages" :key="index" class="margin_top__default" elevation="20" :class="{ 'carousel--mobile': isMobile }">
      <div class="img-wrapper">
        <v-carousel v-if="Array.isArray(advantage.image)" show-arrows hide-delimiters height="auto">
          <v-carousel-item v-for="(img, imgIndex) in advantage.image" :key="imgIndex">
            <v-img :src="resolveImg(img)" cover class="img"/>
          </v-carousel-item>
        </v-carousel>

        <v-img v-else :src="resolveImg(advantage.image)" cover class="img"/>
      </div>

      <v-card-title style="white-space: normal;">
        {{ getText(advantage.name) }}
      </v-card-title>
      <v-card-text v-if="advantage.description">
        <div v-html="getText(advantage.description)" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { isMobile, resolveImg } = useMobileUtils();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.img-wrapper {
  max-height: 600px;
  overflow: hidden;
}
.img {
  max-height: 600px;
  height: 100%;
  object-fit: cover;
}
.carousel--mobile >>> .v-btn.v-btn--icon {
  width: 35px !important;
  height: 35px !important;
  font-size: 14px !important;
}
</style>
