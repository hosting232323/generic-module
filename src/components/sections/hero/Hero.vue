<template>
  <v-container fluid class="hero pa-0">
    <div class="hero-overlay">
      <v-img :src="resolveImg(content.backgroundImage)" cover :height="isMobile ? 500 : 700" class="hero-img">
        <div class="hero-content">
          <v-container>
            <div class="text-center">
              <h1 class="hero-title" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
              <p v-if="content.subtitle" class="hero-subtitle" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.subtitle)"/>
              <v-btn
                v-if="content.button && content.url"
                :color="info.primaryColor"
                size="x-large"
                class="mt-6"
                :href="content.url"
                v-html="getText(content.button)"
              />
            </div>
          </v-container>
        </div>
      </v-img>
    </div>
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
.hero {
  position: relative;
}
.hero-img {
  position: relative;
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 2;
}
.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
}
.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin-top: 20px;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
}
</style>
