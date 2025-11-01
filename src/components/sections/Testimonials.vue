<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Testimonianze'"/>
    <CarouselWrapper
      :items="content.testimonials"
      :primaryColor="info.primaryColor"
      :itemKey="(item, index) => item.name + '-' + index"
      class="margin_top__default"
    >
      <template #default="{ item }">
        <v-card elevation="10" class="testimonial-card pa-6 mx-2">
          <v-card-text>
            <div class="d-flex align-center mb-4">
              <v-avatar size="60" class="mr-4">
                <v-img v-if="item.image" :src="resolveImg(item.image)"/>
                <canvas
                  v-else
                  :ref="el => {
                    if (el) generateProfileImage(el, item.name)
                  }"
                  :data-name="item.name"
                  width="60"
                  height="60"
                ></canvas>
              </v-avatar>
              <div>
                <div class="text-h6 font-weight-bold" v-html="getText(item.name)"/>
                <div v-if="item.role" class="text-subtitle-2" v-html="getText(item.role)"/>
                <div v-if="item.rating" class="d-flex align-center mt-1">
                  <v-icon
                    v-for="i in 5"
                    :key="i"
                    size="18"
                    :color="i <= item.rating ? info.primaryColor : 'grey'"
                  >
                    mdi-star
                  </v-icon>
                </div>
              </div>
            </div>
            <v-icon icon="mdi-format-quote-open" :color="info.primaryColor" size="30" class="mb-2"/>
            <p class="text-body-1" v-html="getText(item.text)"/>
            <v-icon icon="mdi-format-quote-close" :color="info.primaryColor" size="30" class="mt-2"/>
          </v-card-text>
        </v-card>
      </template>
    </CarouselWrapper>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

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
.testimonial-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
