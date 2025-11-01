<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor, textAlign: 'center' }" v-html="getText(content.title)"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(testimonial, index) in content.testimonials"
        :key="index"
        cols="12"
        :md="content.columns || 4"
      >
        <v-card elevation="15" class="testimonial-card-modern pa-6 h-100" :style="{ borderLeft: `5px solid ${info.primaryColor}` }">
          <div class="d-flex align-center mb-4">
            <v-avatar size="70" class="mr-4">
              <v-img v-if="testimonial.image" :src="resolveImg(testimonial.image)"/>
              <canvas
                v-else
                :ref="el => { if (el) generateProfileImage(el, testimonial.name) }"
                :data-name="testimonial.name"
                width="70"
                height="70"
              ></canvas>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold" v-html="getText(testimonial.name)"/>
              <div v-if="testimonial.role" class="text-caption" v-html="getText(testimonial.role)"/>
              <div v-if="testimonial.rating" class="mt-1">
                <v-icon
                  v-for="i in 5"
                  :key="i"
                  size="16"
                  :color="i <= testimonial.rating ? info.primaryColor : 'grey'"
                >
                  mdi-star
                </v-icon>
              </div>
            </div>
          </div>
          <v-icon icon="mdi-format-quote-open" :color="info.primaryColor" size="35"/>
          <p class="text-body-1 my-4" v-html="getText(testimonial.text)"/>
          <v-icon icon="mdi-format-quote-close" :color="info.primaryColor" size="35" class="float-right"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

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
  ctx.fillRect(0, 0, 70, 70);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), 35, 37);
};
</script>

<style scoped>
.testimonial-card-modern {
  transition: transform 0.3s ease;
}
.testimonial-card-modern:hover {
  transform: translateY(-10px);
}
.h-100 {
  height: 100%;
}
</style>
