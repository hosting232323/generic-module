<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      {{ getText(content.title) || 'I nostri vantaggi' }}
    </h1>
    <v-card v-for="(advantage, index) in content.advantages" :key="index" class="margin_top__default" elevation="20">
      <v-img :src="resolveImg(advantage.image)" style="max-height: 600px;" cover />
      <v-card-title style="white-space: normal;">
        {{ getText(advantage.name) }}
      </v-card-title>
      <v-card-text v-if="advantage.description">
        <div v-html="getText(advantage.description)" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { resolveImg } = useMobileUtils();
const { content, info } = defineProps(['content', 'info']);
</script>
