<template>
  <v-container class="ecommerce-advantages">
    <div class="ecommerce-header">
      <h1 
        class="ecommerce-title" 
        :style="{ color: info.primaryColor }" 
        v-html="getText(content.title) || 'I nostri vantaggi'"
      />
      <p class="ecommerce-subtitle">Scopri cosa ci rende unici</p>
    </div>
    
    <v-row class="advantages-row">
      <v-col 
        v-for="(advantage, index) in content.advantages" 
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card 
          class="advantage-card-ecommerce" 
          elevation="0"
          :class="{ 'carousel--mobile': isMobile }"
        >
          <div class="card-badge" :style="{ background: info.primaryColor }">
            <span>{{ index + 1 }}</span>
          </div>
          
          <div :class="['img-wrapper-ecommerce', { 'mobile-height': isMobile }]">
            <v-carousel 
              v-if="Array.isArray(advantage.image)" 
              show-arrows 
              hide-delimiters 
              :height="isMobile ? '280px' : '350px'"
            >
              <v-carousel-item v-for="(img, imgIndex) in advantage.image" :key="imgIndex">
                <img :src="resolveImg(img)" class="img-ecommerce"/>
              </v-carousel-item>
            </v-carousel>
            <img v-else :src="resolveImg(advantage.image)" class="img-ecommerce"/>
          </div>
          
          <div class="card-body">
            <v-card-title class="advantage-name-ecommerce" v-html="getText(advantage.name)"/>
            
            <v-card-text v-if="advantage.description" class="advantage-description-ecommerce">
              <div v-html="getText(advantage.description)"/>
            </v-card-text>
            
            <div class="card-footer">
              <v-icon :color="info.primaryColor" size="small">mdi-check-circle</v-icon>
              <span class="verified-text" :style="{ color: info.primaryColor }">Verificato</span>
            </div>
          </div>
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
.ecommerce-advantages {
  padding: 70px 20px;
}

.ecommerce-header {
  text-align: center;
  margin-bottom: 50px;
}

.ecommerce-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.ecommerce-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-top: 10px;
}

.advantages-row {
  max-width: 1200px;
  margin: 0 auto;
}

.advantage-card-ecommerce {
  height: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.advantage-card-ecommerce:hover {
  border-color: transparent;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  transform: translateY(-5px);
}

.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-badge span {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.img-wrapper-ecommerce {
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
  background-color: #fafafa;
}

.img-wrapper-ecommerce.mobile-height {
  height: 280px !important;
}

.img-ecommerce {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.advantage-card-ecommerce:hover .img-ecommerce {
  transform: scale(1.08);
}

.card-body {
  padding: 20px;
}

.advantage-name-ecommerce {
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0 0 10px 0;
  white-space: normal;
  line-height: 1.3;
  color: #212121;
}

.advantage-description-ecommerce {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #616161;
  padding: 0 0 15px 0;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.verified-text {
  font-size: 0.9rem;
  font-weight: 600;
}

.carousel--mobile :deep(.v-btn.v-btn--icon) {
  width: 35px !important;
  height: 35px !important;
  font-size: 14px !important;
}

@media (max-width: 960px) {
  .ecommerce-title {
    font-size: 2rem;
  }
  
  .ecommerce-subtitle {
    font-size: 1rem;
  }
  
  .ecommerce-advantages {
    padding: 40px 15px;
  }
}
</style>
