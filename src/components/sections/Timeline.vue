<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'La nostra storia'"/>
    <v-timeline
      class="margin_top__default"
      :side="isMobile ? 'end' : 'start'"
      :density="isMobile ? 'compact' : 'default'"
    >
      <v-timeline-item
        v-for="(event, index) in content.events"
        :key="index"
        :dot-color="info.primaryColor"
        size="small"
      >
        <template v-slot:opposite v-if="!isMobile">
          <div class="text-h6 font-weight-bold" v-html="getText(event.date)"/>
        </template>
        <v-card elevation="10">
          <v-card-title>
            <span v-if="isMobile" class="mr-3 font-weight-bold" :style="{ color: info.primaryColor }" v-html="getText(event.date)"/>
            <span v-html="getText(event.title)"/>
          </v-card-title>
          <v-card-text>
            <p v-html="getText(event.description)"/>
            <v-img v-if="event.image" :src="resolveImg(event.image)" class="mt-4" :height="isMobile ? 200 : 250" cover/>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>
