<template>
  <v-container class="creative-advantages" fluid>
    <div class="creative-header">
      <h1 
        class="creative-title" 
        :style="{ color: info.primaryColor }" 
        v-html="getText(content.title) || 'I nostri vantaggi'"
      />
    </div>
    
    <div class="advantages-masonry">
      <v-card 
        v-for="(advantage, index) in content.advantages" 
        :key="index"
        class="advantage-card-creative" 
        elevation="8"
        :class="{ 'carousel--mobile': isMobile, 'card-alternate': index % 2 !== 0 }"
      >
        <div class="card-content">
          <div :class="['img-wrapper-creative', { 'mobile-height': isMobile }]">
            <v-carousel 
              v-if="Array.isArray(advantage.image)" 
              show-arrows 
              hide-delimiters 
              :height="isMobile ? '350px' : '450px'"
              cycle
              interval="4000"
            >
              <v-carousel-item v-for="(img, imgIndex) in advantage.image" :key="imgIndex">
                <img :src="resolveImg(img)" class="img-creative"/>
              </v-carousel-item>
            </v-carousel>
            <img v-else :src="resolveImg(advantage.image)" class="img-creative"/>
            
            <div class="creative-overlay" :style="{ background: `linear-gradient(135deg, ${info.primaryColor}40 0%, ${info.secondaryColor}60 100%)` }">
              <v-card-title class="advantage-name-overlay" v-html="getText(advantage.name)"/>
            </div>
          </div>
          
          <v-card-text v-if="advantage.description" class="advantage-description-creative">
            <div v-html="getText(advantage.description)"/>
          </v-card-text>
        </div>
      </v-card>
    </div>
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
.creative-advantages {
  padding: 80px 20px;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
}

.creative-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.creative-title {
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  position: relative;
  display: inline-block;
  text-transform: capitalize;
}

.creative-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%);
}

.advantages-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.advantage-card-creative {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.advantage-card-creative:hover {
  transform: rotate(-2deg) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

.advantage-card-creative.card-alternate:hover {
  transform: rotate(2deg) scale(1.02);
}

.card-content {
  position: relative;
}

.img-wrapper-creative {
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
}

.img-wrapper-creative.mobile-height {
  height: 350px !important;
}

.img-creative {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
  filter: brightness(0.9);
}

.advantage-card-creative:hover .img-creative {
  transform: scale(1.15) rotate(2deg);
  filter: brightness(1);
}

.creative-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  backdrop-filter: blur(10px);
  opacity: 0.95;
  transition: all 0.3s ease;
}

.advantage-card-creative:hover .creative-overlay {
  opacity: 1;
  backdrop-filter: blur(5px);
}

.advantage-name-overlay {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  white-space: normal;
  padding: 0;
  line-height: 1.2;
}

.advantage-description-creative {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
  padding: 25px;
  background: white;
}

.carousel--mobile :deep(.v-btn.v-btn--icon) {
  width: 35px !important;
  height: 35px !important;
  font-size: 14px !important;
}

@media (max-width: 960px) {
  .creative-title {
    font-size: 2.2rem;
  }
  
  .creative-advantages {
    padding: 50px 15px;
  }
  
  .advantages-masonry {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .advantage-card-creative:hover {
    transform: scale(1.02);
  }
  
  .advantage-card-creative.card-alternate:hover {
    transform: scale(1.02);
  }
}
</style>
