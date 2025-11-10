<template>
  <v-container class="business-advantages">
    <div class="advantages-header">
      <h1 
        class="advantages-title" 
        :style="{ color: info.primaryColor }" 
        v-html="getText(content.title) || 'I nostri vantaggi'"
      />
      <v-divider 
        class="title-divider" 
        :style="{ borderColor: info.primaryColor }"
      />
    </div>
    
    <v-row class="advantages-grid">
      <v-col 
        v-for="(advantage, index) in content.advantages" 
        :key="index"
        cols="12"
        md="6"
      >
        <v-card 
          class="advantage-card" 
          elevation="4"
          :class="{ 'carousel--mobile': isMobile }"
        >
          <div :class="['img-wrapper', { 'mobile-height': isMobile }]">
            <v-carousel 
              v-if="Array.isArray(advantage.image)" 
              show-arrows 
              hide-delimiters 
              :height="isMobile ? '300px' : '400px'"
            >
              <v-carousel-item v-for="(img, imgIndex) in advantage.image" :key="imgIndex">
                <img :src="resolveImg(img)" class="img"/>
              </v-carousel-item>
            </v-carousel>
            <img v-else :src="resolveImg(advantage.image)" class="img"/>
            <div class="overlay" :style="{ background: `linear-gradient(180deg, transparent 0%, ${info.primaryColor}20 100%)` }"/>
          </div>
          
          <v-card-title class="advantage-name" v-html="getText(advantage.name)"/>
          
          <v-card-text v-if="advantage.description" class="advantage-description">
            <div v-html="getText(advantage.description)"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { setupMobileUtils, resolveImg } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const isMobile = setupMobileUtils();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.business-advantages {
  padding: 60px 20px;
}

.advantages-header {
  text-align: center;
  margin-bottom: 50px;
}

.advantages-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.title-divider {
  width: 80px;
  margin: 0 auto;
  border-width: 3px;
  opacity: 1;
}

.advantages-grid {
  margin-top: 40px;
}

.advantage-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.advantage-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.img-wrapper {
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
}

.img-wrapper.mobile-height {
  height: 300px !important;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.advantage-card:hover .img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
}

.advantage-name {
  font-size: 1.5rem;
  font-weight: 600;
  padding: 20px 20px 10px;
  white-space: normal;
  line-height: 1.3;
}

.advantage-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  padding: 0 20px 20px;
}

.carousel--mobile :deep(.v-btn.v-btn--icon) {
  width: 35px !important;
  height: 35px !important;
  font-size: 14px !important;
}

@media (max-width: 960px) {
  .advantages-title {
    font-size: 2rem;
  }
  
  .business-advantages {
    padding: 40px 15px;
  }
}
</style>
