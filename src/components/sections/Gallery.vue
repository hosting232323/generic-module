<template>
  <v-carousel 
    :height="mobile.setupMobileUtils().value ? 400 : 600" 
    hide-delimiter-background 
    hide-delimiters
    v-model="currentIndex"
    :show-arrows="false"
    :continuous="false"
  >
    <v-carousel-item 
      v-for="(slide, index) in content" 
      :key="index"
    >
      <div 
        class="image-container"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
        @click="handleClick"
      >
        <v-img 
          :src="slide" 
          class="carousel-image" 
          cover 
          height="100%"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div 
          class="hover-effect"
          :class="{ 'active': hoverIndex === index }"
        ></div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue';
import mobile from '@/utils/mobile';

const { content } = defineProps(['content']);
const currentIndex = ref(0);
const hoverIndex = ref(null);

const handleClick = () => {
  currentIndex.value = (currentIndex.value + 1) % content.length;
};
</script>

<style scoped>
.v-carousel {
  overflow: hidden;
}

.image-container {
  position: relative;
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.carousel-image {
  height: 100%;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.hover-effect {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.hover-effect.active {
  opacity: 1;
}

.v-carousel__item {
  transition: transform 0.5s ease;
}

:deep(.v-carousel__controls),
:deep(.v-btn--icon),
:deep(.v-carousel__prev),
:deep(.v-carousel__next) {
  display: none !important;
}
</style>
