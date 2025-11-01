<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Video'"/>
    <v-card elevation="20" class="margin_top__default">
      <div class="video-wrapper">
        <iframe
          v-if="content.type === 'youtube' || content.type === 'vimeo'"
          :src="getEmbedUrl()"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video-iframe"
        ></iframe>
        <video
          v-else
          controls
          :poster="content.poster ? resolveImg(content.poster) : undefined"
          class="video-player"
        >
          <source :src="content.url" :type="content.mimeType || 'video/mp4'">
        </video>
      </div>
      <v-card-text v-if="content.description">
        <p v-html="getText(content.description)"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const getEmbedUrl = () => {
  if (content.type === 'youtube') {
    const videoId = content.url.includes('v=') 
      ? content.url.split('v=')[1].split('&')[0]
      : content.url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (content.type === 'vimeo') {
    const videoId = content.url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return content.url;
};
</script>

<style scoped>
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}
.video-iframe,
.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
