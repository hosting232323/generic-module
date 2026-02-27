<template>
  <v-carousel
    v-if="content.type === 'manual'"
    :id="id"
    :height="isMobile ? 400 : 600"
    delimiter-icon="mdi-square"
  >
    <v-carousel-item
      v-for="(slide, index) in content.images"
      :key="index"
    >
      <v-img
        :src="resolveImg(slide)"
        cover
      />
    </v-carousel-item>
  </v-carousel>

  <div
    v-else
    class="carousel-wrapper"
    @mouseenter="pause"
    @mouseleave="start"
  >
    <div
      class="carousel-track"
      :style="{
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: transitioning ? 'transform 0.5s ease-in-out' : 'none'
      }"
      @transitionend="handleTransitionEnd"
    >
      <div
        v-for="(img, index) in extendedImages"
        :key="index"
        class="carousel-item"
      >
        <img :src="resolveImg(img)">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { id, content } = defineProps({
  id: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  }
});

const isAnimating = ref(false);
const currentIndex = ref(0);
const transitioning = ref(true);
let intervalId = null;

const extendedImages = computed(() => [...content.images, content.images[0]]);

const prev = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentIndex.value =
    (currentIndex.value + content.images.length - 1) % content.images.length;
  transitioning.value = true;
};

const next = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentIndex.value += 1;
  transitioning.value = true;
};

const handleTransitionEnd = () => {
  if (currentIndex.value === content.images.length) {
    transitioning.value = false;
    currentIndex.value = 0;
  }
  isAnimating.value = false; 
};

const start = () => {
  intervalId = setInterval(next, 4000);
};

const pause = () => {
  clearInterval(intervalId);
};

const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prev();
    pause();
    start();
  } else if (event.key === 'ArrowRight') {
    next();
    pause();
    start();
  }
};

onUnmounted(() => {
  pause();
  window.removeEventListener('keydown', handleKeydown);
});

const preloadImages = () => {
  content.images.forEach((img) => {
    const image = new Image();
    image.src = resolveImg(img);
  });
};

onMounted(() => {
  preloadImages();
  if (content.type !== 'manual') start();
  window.addEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.carousel-wrapper {
  width: 100vw;
  height: 96vh;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  height: 100%;
}

.carousel-item {
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.carousel-item img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
}
</style>
