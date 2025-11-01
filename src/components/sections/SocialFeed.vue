<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Social Feed'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(post, index) in content.posts"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 4"
      >
        <v-card elevation="10" class="social-card" @click="openPost(post)">
          <v-img
            v-if="post.image"
            :src="resolveImg(post.image)"
            :height="isMobile ? 250 : 300"
            cover
          />
          <v-card-title>
            <div class="d-flex align-center">
              <v-icon :icon="getSocialIcon(post.platform)" :color="info.primaryColor" class="mr-2"/>
              <span v-html="getText(post.username)"/>
            </div>
          </v-card-title>
          <v-card-text>
            <p v-html="getText(post.text)"/>
            <div class="text-caption text-grey mt-2">
              {{ post.date }}
            </div>
          </v-card-text>
          <v-card-actions class="px-4 pb-4">
            <v-icon icon="mdi-heart" :color="info.primaryColor" size="20"/>
            <span class="ml-1 text-caption">{{ post.likes }}</span>
            <v-icon icon="mdi-comment" class="ml-4" size="20"/>
            <span class="ml-1 text-caption">{{ post.comments }}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const getSocialIcon = (platform) => {
  const icons = {
    instagram: 'mdi-instagram',
    facebook: 'mdi-facebook',
    twitter: 'mdi-twitter',
    linkedin: 'mdi-linkedin',
    youtube: 'mdi-youtube'
  };
  return icons[platform?.toLowerCase()] || 'mdi-share-variant';
};

const openPost = (post) => {
  if (post.url) {
    window.open(post.url, '_blank');
  }
};
</script>

<style scoped>
.social-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.social-card:hover {
  transform: translateY(-5px);
}
</style>
