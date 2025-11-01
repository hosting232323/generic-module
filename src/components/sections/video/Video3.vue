<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div class="video-content">
          <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info?.title) }}</h2>
          <p class="text-h6 text-medium-emphasis mb-6">{{ getText(info?.subtitle) }}</p>
          <ul v-if="content?.features" class="feature-list">
            <li v-for="(feature, index) in content.features" :key="index" class="feature-item">
              <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
              {{ getText(feature) }}
            </li>
          </ul>
          <v-btn v-if="content?.buttonText" color="primary" variant="flat" size="large" class="mt-4" @click="handleAction">
            {{ getText(content.buttonText) }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="video-wrapper-side">
          <iframe v-if="content?.videoUrl" :src="content.videoUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="video-iframe"></iframe>
          <v-img v-else :src="resolveImg(content?.thumbnail)" aspect-ratio="16/9" cover class="video-placeholder" @click="handlePlay">
            <div class="play-overlay">
              <v-btn icon="mdi-play" size="x-large" color="primary" elevation="8"></v-btn>
            </div>
          </v-img>
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

const handleAction = () => {
};
</script>

<style scoped>
.video-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.video-wrapper-side {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
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
