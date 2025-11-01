<template>
  <v-container fluid class="hero-split pa-0">
    <v-row no-gutters :style="{ minHeight: isMobile ? '600px' : '800px' }">
      <v-col cols="12" md="6" class="hero-content-side" :style="{ backgroundColor: info.primaryColor }">
        <div class="hero-text-side pa-10">
          <h1 class="hero-title-side mb-6" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
          <p v-if="content.subtitle" class="hero-subtitle-side mb-6" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.subtitle)"/>
          <p v-if="content.description" class="hero-description mb-8" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.description)"/>
          <v-btn
            v-if="content.button && content.url"
            :color="content.buttonColor || '#FFFFFF'"
            :style="{ color: content.buttonTextColor || info.primaryColor }"
            size="x-large"
            :href="content.url"
            variant="flat"
            v-html="getText(content.button)"
          />
        </div>
      </v-col>
      <v-col cols="12" md="6" class="hero-image-side pa-0">
        <v-img :src="resolveImg(content.backgroundImage)" cover height="100%"/>
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
</script>

<style scoped>
.hero-split {
  position: relative;
}
.hero-content-side {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-text-side {
  max-width: 600px;
}
.hero-title-side {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.2;
}
.hero-subtitle-side {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  line-height: 1.4;
}
.hero-description {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
}
</style>
