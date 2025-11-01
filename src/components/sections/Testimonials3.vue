<template>
  <v-container class="testimonials-section py-16">
    <v-row v-if="content.title" justify="center" class="mb-12">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: info.primaryColor }">
          {{ getText(content.title) }}
        </h2>
        <div class="title-underline" :style="{ background: `linear-gradient(90deg, transparent, ${info.primaryColor}, transparent)` }"></div>
      </v-col>
    </v-row>
    <v-expansion-panels variant="accordion" class="testimonials-panels">
      <v-expansion-panel
        v-for="(testimonial, index) in content.testimonials"
        :key="index"
        class="testimonial-panel mb-4"
        elevation="0"
      >
        <v-expansion-panel-title class="testimonial-header">
          <div class="d-flex align-center w-100">
            <div class="avatar-container">
              <v-avatar size="60" class="testimonial-avatar">
                <v-img v-if="testimonial.image" :src="resolveImg(testimonial.image)"/>
                <canvas
                  v-else
                  :ref="el => { if (el) generateProfileImage(el, testimonial.name) }"
                  :data-name="testimonial.name"
                  width="60"
                  height="60"
                ></canvas>
              </v-avatar>
              <div class="avatar-ring" :style="{ borderColor: info.primaryColor }"></div>
            </div>
            <div class="ml-5 flex-grow-1">
              <div class="text-h6 font-weight-bold" :style="{ color: info.primaryColor }" v-html="getText(testimonial.name)"/>
              <div v-if="testimonial.role" class="text-body-2 text-medium-emphasis" v-html="getText(testimonial.role)"/>
            </div>
            <div v-if="testimonial.rating" class="rating-stars">
              <v-icon
                v-for="i in 5"
                :key="i"
                size="20"
                :color="i <= testimonial.rating ? info.primaryColor : '#E0E0E0'"
                class="star-icon"
              >
                mdi-star
              </v-icon>
            </div>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-divider class="my-4" :style="{ borderColor: info.primaryColor + '40' }"/>
          <div class="testimonial-text">
            <v-icon :icon="'mdi-format-quote-open'" size="24" :color="info.primaryColor" class="quote-icon"/>
            <p class="text-h6 font-weight-light my-4" v-html="getText(testimonial.text)"/>
            <v-icon :icon="'mdi-format-quote-close'" size="24" :color="info.primaryColor" class="quote-icon quote-close"/>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
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
  ctx.fillRect(0, 0, 60, 60);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '26px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), 30, 32);
};
</script>

<style scoped>
.testimonials-section {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.title-underline {
  width: 200px;
  height: 4px;
  margin: 20px auto 0;
  border-radius: 2px;
}

.testimonials-panels {
  max-width: 900px;
  margin: 0 auto;
}

.testimonial-panel {
  border-radius: 15px;
  border: 2px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.testimonial-panel:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(214, 52, 71, 0.15);
  border-color: currentColor;
}

.testimonial-header {
  padding: 25px 30px;
}

.avatar-container {
  position: relative;
}

.testimonial-avatar {
  transition: transform 0.3s ease;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.avatar-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 70px;
  height: 70px;
  border: 3px solid;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.testimonial-panel:hover .avatar-ring {
  opacity: 1;
  transform: scale(1);
}

.testimonial-panel:hover .testimonial-avatar {
  transform: scale(1.05);
}

.rating-stars {
  display: flex;
  gap: 4px;
}

.star-icon {
  transition: transform 0.2s ease;
}

.testimonial-panel:hover .star-icon {
  animation: starPulse 0.6s ease-in-out;
}

@keyframes starPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.testimonial-text {
  position: relative;
  padding: 20px 40px;
  line-height: 1.8;
}

.quote-icon {
  opacity: 0.3;
}

.quote-close {
  float: right;
}
</style>