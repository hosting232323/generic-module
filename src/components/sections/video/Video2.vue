<template>
  <v-container fluid class="video-hero">
    <div class="video-hero-content">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h2 font-weight-bold text-white mb-6">{{ getText(info?.title) }}</h2>
            <p class="text-h5 text-white mb-8">{{ getText(info?.subtitle) }}</p>
            <v-btn color="white" variant="flat" size="x-large" @click="handlePlay">
              <v-icon start>mdi-play</v-icon>
              {{ getText(content?.playText || { en: 'Watch Video', it: 'Guarda Video' }) }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-img v-if="content?.thumbnail" :src="resolveImg(content.thumbnail)" cover class="video-bg"></v-img>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

defineProps({
  content: Object,
  info: Object
});

const { getText } = useLanguageStore();

const handlePlay = () => {
};
</script>

<style scoped>
.video-hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.video-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.video-hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 80px 0;
}
</style>
