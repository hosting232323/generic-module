<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <div class="video-wrapper">
          <iframe v-if="content?.videoUrl" :src="content.videoUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="video-iframe"></iframe>
          <v-img v-else :src="resolveImg(content?.thumbnail)" aspect-ratio="16/9" cover class="video-placeholder" @click="handlePlay">
            <div class="play-overlay">
              <v-btn icon="mdi-play" size="x-large" color="white" elevation="8"></v-btn>
            </div>
          </v-img>
        </div>
        <div v-if="content?.caption" class="text-center mt-6">
          <p class="text-h6">{{ getText(content.caption) }}</p>
        </div>
      </v-col>
    </v-row>
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
.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
}

.video-iframe {
  width: 100%;
  aspect-ratio: 16/9;
  display: block;
}

.video-placeholder {
  cursor: pointer;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.3s;
}

.video-placeholder:hover .play-overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
