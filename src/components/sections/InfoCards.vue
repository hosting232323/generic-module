<template>
  <v-container>
    <h1 v-if="content.title" :style="{ color: info.primaryColor }" v-html="getText(content.title)"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(card, index) in content.cards"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 3"
      >
        <v-card
          elevation="10"
          class="info-card h-100"
          :class="{ 'card-clickable': card.url }"
          @click="card.url ? navigateTo(card.url) : null"
        >
          <v-img v-if="card.image" :src="resolveImg(card.image)" :height="isMobile ? 200 : 250" cover/>
          <v-card-title :style="{ color: info.primaryColor }">
            <v-icon v-if="card.icon" :icon="card.icon" class="mr-2" :color="info.primaryColor"/>
            <span v-html="getText(card.title)"/>
          </v-card-title>
          <v-card-text>
            <p v-html="getText(card.description)"/>
          </v-card-text>
          <v-card-actions v-if="card.button && card.url" class="pa-4">
            <v-btn
              :color="info.primaryColor"
              variant="outlined"
              block
              v-html="getText(card.button)"
            />
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

const navigateTo = (url) => {
  if (url.startsWith('http')) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};
</script>

<style scoped>
.info-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.info-card.card-clickable {
  cursor: pointer;
}
.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.h-100 {
  height: 100%;
}
</style>
