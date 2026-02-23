<template>
  <v-container>
    <h1
      :style="{ color: info.primaryColor, textAlign: orientationTitle }"
      v-html="getText(content.title) || 'I nostri vantaggi'"
    />
    <div
      :style="{ textAlign: orientationDescription }"
      v-html="getText(content.description)"
    />
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { computed } from 'vue';

const { getText } = useLanguageStore();
const { content, info } = defineProps({
  content: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    required: true
  }
});

const orientationTitle = computed(() => {
  if (content.orientationTitle)
    return content.orientationTitle;
  else 
    return 'left';
});

const orientationDescription = computed(() => {
  if (content.orientationDescription)
    return content.orientationDescription;
  else 
    return 'left';
});
</script>
