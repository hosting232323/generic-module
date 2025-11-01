<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(info.title) || 'Ciò che dicono di noi'" />
      <CarouselWrapper
        :items="content"
        :primaryColor="info.primaryColor"
        :itemKey="(item, index) => getText(item.name) + '-' + index"
      >
        <template #default="{ item }">
          <div class="review pa-4">
            <div class="d-flex align-center" style="margin-bottom: 15px;">
              <v-avatar size="35" class="mr-3">
                <canvas
                  :ref="el => {
                    if (el) generateProfileImage(el, getText(item.name))
                  }"
                  :data-name="getText(item.name)"
                  width="40"
                  height="40"
                ></canvas>
              </v-avatar>
              <p class="d-flex align-center justify-center">
                {{ getText(item.name) }}
                <span class="ml-2 d-flex align-center justify-center">
                  <v-icon
                    v-for="i in 5"
                    :key="i"
                    size="18"
                    :color="i <= item.rating ? info.primaryColor : 'grey'"
                  >
                    mdi-star
                  </v-icon>
                </span>
              </p>
            </div>
            <p>{{ getText(item.text) }}</p>
            <div
              class="dotted-line-big"
              :style="{ backgroundImage: `radial-gradient(${info.primaryColor} 1px, transparent 2px)` }"
            ></div>
          </div>
        </template>
      </CarouselWrapper>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
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

const generateProfileImage = (canvas, name) => {;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const bgColor = hashColor(name);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 40, 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), 20, 22);
};
</script>

<style scoped>
.dotted-line-big {
  height: 8px;
  background-size: 7px 7px;
  background-repeat: repeat-x;
  margin: 15px 0;
}
</style>
