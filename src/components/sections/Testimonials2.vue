<template>
  <v-container :id="info.name">
    <!-- Section Title from info -->
    <div v-if="info.title" class="text-center mb-8">
      <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: info.primaryColor }" v-html="getText(info.title)"/>
      <p v-if="info.subtitle" class="text-h6 text-medium-emphasis" v-html="getText(info.subtitle)"/>
    </div>
    
    <v-row class="margin_top__default justify-center">
      <v-col cols="12" md="8">
        <v-card elevation="20" :color="info.primaryColor" dark class="pa-10 text-center testimonial-quote-card">
          <v-icon icon="mdi-format-quote-open" size="60" class="mb-6"/>
          <p class="text-h5 font-weight-light mb-8" v-html="getText(currentTestimonial.text)"/>
          <v-divider class="my-6" color="white" opacity="0.5"/>
          <div class="d-flex align-center justify-center">
            <v-avatar size="60" class="mr-4">
              <v-img v-if="currentTestimonial.image" :src="resolveImg(currentTestimonial.image)"/>
              <canvas
                v-else
                :ref="el => { if (el) generateProfileImage(el, currentTestimonial.name) }"
                :data-name="currentTestimonial.name"
                width="60"
                height="60"
              ></canvas>
            </v-avatar>
            <div class="text-left">
              <div class="text-h6 font-weight-bold" v-html="getText(currentTestimonial.name)"/>
              <div v-if="currentTestimonial.role" class="text-body-2" v-html="getText(currentTestimonial.role)"/>
            </div>
          </div>
          <div class="mt-6">
            <v-btn
              v-for="(_, index) in content"
              :key="index"
              icon
              size="small"
              :color="index === currentIndex ? 'white' : 'transparent'"
              @click="currentIndex = index"
              class="mx-1"
            >
              <v-icon size="10">mdi-circle</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const currentIndex = ref(0);
const currentTestimonial = computed(() => content[currentIndex.value]);

let interval;
onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % content.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const hashColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#16A085', '#E74C3C'];
  return colors[Math.abs(hash) % colors.length];
};

const generateProfileImage = (canvas, name) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const bgColor = hashColor(name);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 60, 60);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), 30, 32);
};
</script>

<style scoped>
.testimonial-quote-card {
  border-radius: 20px;
}
</style>
