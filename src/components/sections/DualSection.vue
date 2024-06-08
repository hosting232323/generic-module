<template>
  <v-container>
    <v-row align="center">
      <v-col
        :cols="isMobile ? 12 : 6"
        md="6"
        v-for="contentType in contentTypes"
        :key="contentType"
      >
        <v-img :src="resolveImg(content.image)" v-if="contentType == 'image'" cover />

        <v-sheet style="background-color: transparent;" v-else>
          <p v-if="content.title" class="text-h3" :style="{ color: info.primaryColor + '!important', fontSize: '32px !important', fontWeight: '500' }" v-html="getText(content.title)" />
          <br />
          <p v-if="content.subtitle" class="text-subtitle-1 font-weight-black" v-html="getText(content.subtitle) + '<br>'" />
          <p v-if="content.description" v-html="getText(content.description)" />
          <br />
          <a :href="content.url" v-if="content.url && content.button">
            <v-btn v-html="getText(content.button)" class="text-none" variant="flat" :color="info.primaryColor" :style="{ marginTop: '7px' }" />
          </a>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const contentTypes = computed(() => {
  if (isMobile.value)
    return (content.orientationMobile || 'bottom') === 'bottom'
      ? ['text', 'image']
      : ['image', 'text'];
  else
    return (content.orientationDesktop || 'right') === 'right'
      ? ['text', 'image']
      : ['image', 'text'];
});
</script>
