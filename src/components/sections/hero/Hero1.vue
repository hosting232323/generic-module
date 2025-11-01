<template>
  <v-container fluid class="hero-centered pa-0">
    <v-img :src="resolveImg(content.backgroundImage)" cover :height="isMobile ? 600 : 800">
      <div class="hero-content-centered">
        <v-container>
          <div class="text-center hero-text-box">
            <v-avatar v-if="content.logo" size="100" class="mb-6">
              <v-img :src="resolveImg(content.logo)"/>
            </v-avatar>
            <h1 class="hero-title-centered" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
            <p v-if="content.subtitle" class="hero-subtitle-centered" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.subtitle)"/>
            <div v-if="content.button && content.url" class="mt-8">
              <v-btn
                :color="info.primaryColor"
                size="x-large"
                :href="content.url"
                variant="flat"
                elevation="10"
                v-html="getText(content.button)"
              />
            </div>
          </div>
        </v-container>
      </div>
    </v-img>
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
.hero-centered {
  position: relative;
}
.hero-content-centered {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.hero-text-box {
  background: rgba(0, 0, 0, 0.3);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}
.hero-title-centered {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  text-shadow: 3px 3px 10px rgba(0,0,0,0.8);
  margin-bottom: 20px;
}
.hero-subtitle-centered {
  font-size: clamp(1.2rem, 3vw, 2rem);
  text-shadow: 2px 2px 6px rgba(0,0,0,0.8);
}
</style>
