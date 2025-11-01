<template>
  <v-container fluid :class="{ 'pa-0': content.fullWidth }">
    <v-parallax :src="resolveImg(content.image)" :height="isMobile ? 400 : 600">
      <div class="parallax-content">
        <v-container>
          <div :class="{ 'text-center': content.centered }">
            <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
            <p v-if="content.subtitle" class="text-h6" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.subtitle)"/>
            <v-btn
              v-if="content.button && content.url"
              :color="info.primaryColor"
              size="large"
              class="mt-6"
              :href="content.url"
              v-html="getText(content.button)"
            />
          </div>
        </v-container>
      </div>
    </v-parallax>
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
.parallax-content {
  display: flex;
  align-items: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
</style>
