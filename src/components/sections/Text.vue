<template>
  <v-container class="py-12">
    <div class="text-center">
      <h1 :style="{ color: info.primaryColor }">
        {{ getText(content.title) || 'Chi Siamo' }}
      </h1>
      <p class="text-body-1 text-md-body-lg mx-auto font paragrafo" v-html="getText(content.text)" />
    </div>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.paragrafo {
  max-width: 800px;
  line-height: 1.8;
  white-space: pre-line;
  color: #fff;
}
</style>
