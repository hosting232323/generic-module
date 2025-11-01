<template>
  <v-container fluid class="hero-minimal pa-0">
    <v-carousel
      v-if="content.images && content.images.length > 0"
      :show-arrows="false"
      hide-delimiter-background
      cycle
      :interval="4000"
      :height="isMobile ? '500px' : '700px'"
      class="hero-carousel"
    >
      <v-carousel-item
        v-for="(image, i) in content.images"
        :key="i"
        :src="image"
        cover
      >
        <div class="hero-overlay" :style="{ background: `linear-gradient(135deg, ${info.primaryColor}CC 0%, ${info.primaryColor}99 50%, ${info.primaryColor}CC 100%)` }">
          <div class="decorative-pattern"></div>
          <v-container :style="{ height: isMobile ? '500px' : '700px' }" class="position-relative">
            <v-row align="center" :style="{ height: isMobile ? '500px' : '700px' }">
              <v-col cols="12" md="8" class="mx-auto text-center">
                <h1 class="hero-minimal-title mb-6 animate-fade-in" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
                <p v-if="content.subtitle" class="hero-minimal-subtitle mb-8 animate-fade-in-delay" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.subtitle)"/>
                <div v-if="content.buttons" class="animate-fade-in-delay-2">
                  <v-btn
                    v-for="(button, index) in content.buttons"
                    :key="index"
                    :color="button.color || '#FFFFFF'"
                    :style="{ color: button.textColor || info.primaryColor }"
                    size="large"
                    :href="button.url"
                    :variant="button.variant || 'flat'"
                    class="mx-2 mb-2 hero-btn"
                    elevation="8"
                    v-html="getText(button.text)"
                  />
                </div>
                <v-btn
                  v-else-if="content.button && content.url"
                  color="white"
                  :style="{ color: info.primaryColor }"
                  size="x-large"
                  :href="content.url"
                  variant="flat"
                  class="hero-btn animate-fade-in-delay-2"
                  elevation="8"
                  v-html="getText(content.button)"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-carousel-item>
    </v-carousel>
    
    <div v-else class="hero-minimal-content" :style="{ backgroundColor: info.primaryColor, minHeight: isMobile ? '400px' : '600px' }">
      <v-container>
        <v-row align="center" :style="{ minHeight: isMobile ? '400px' : '600px' }">
          <v-col cols="12" md="8" class="mx-auto text-center">
            <h1 class="hero-minimal-title mb-6" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
            <p v-if="content.subtitle" class="hero-minimal-subtitle mb-8" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.subtitle)"/>
            <div v-if="content.buttons">
              <v-btn
                v-for="(button, index) in content.buttons"
                :key="index"
                :color="button.color || '#FFFFFF'"
                :style="{ color: button.textColor || info.primaryColor }"
                size="large"
                :href="button.url"
                :variant="button.variant || 'flat'"
                class="mx-2 mb-2"
                v-html="getText(button.text)"
              />
            </div>
            <v-btn
              v-else-if="content.button && content.url"
              color="white"
              :style="{ color: info.primaryColor }"
              size="x-large"
              :href="content.url"
              variant="flat"
              v-html="getText(content.button)"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.hero-carousel {
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.decorative-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: 
    radial-gradient(circle at 20% 50%, white 2px, transparent 2px),
    radial-gradient(circle at 80% 80%, white 2px, transparent 2px),
    radial-gradient(circle at 50% 20%, white 1px, transparent 1px);
  background-size: 100px 100px, 150px 150px, 80px 80px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.hero-minimal-content {
  display: flex;
  align-items: center;
}

.hero-minimal-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: -1px;
}

.hero-minimal-subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  line-height: 1.4;
  opacity: 0.95;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.hero-btn {
  transition: all 0.3s ease !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

.hero-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.position-relative {
  position: relative;
  z-index: 1;
}
</style>
