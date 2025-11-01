<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri partner'"/>
    <v-row class="margin_top__default align-center">
      <v-col
        v-for="(partner, index) in content.partners"
        :key="index"
        cols="6"
        sm="4"
        :md="content.columns || 3"
        class="text-center"
      >
        <a
          :href="partner.url"
          target="_blank"
          class="partner-link"
        >
          <v-img
            :src="resolveImg(partner.logo)"
            :height="isMobile ? 60 : 100"
            contain
            class="partner-logo"
          />
          <p v-if="partner.name" class="mt-2 text-caption" v-html="getText(partner.name)"/>
        </a>
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
</script>

<style scoped>
.partner-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.3s ease;
}
.partner-link:hover {
  opacity: 0.7;
}
.partner-logo {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}
.partner-link:hover .partner-logo {
  filter: grayscale(0%);
}
</style>
