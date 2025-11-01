<template>
  <v-container>
    <v-card
      elevation="20"
      :color="content.backgroundColor || info.primaryColor"
      :dark="!content.backgroundColor"
      class="cta-card"
    >
      <v-card-text class="text-center pa-10">
        <h2 class="text-h3 font-weight-bold mb-4" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.title)"/>
        <p v-if="content.description" class="text-h6 mb-6" :style="{ color: content.textColor || '#FFFFFF' }" v-html="getText(content.description)"/>
        <v-btn
          v-if="content.button && content.url"
          :color="content.buttonColor || '#FFFFFF'"
          :style="{ color: content.buttonTextColor || info.primaryColor }"
          size="x-large"
          :href="content.url"
          variant="flat"
          class="px-8"
          v-html="getText(content.button)"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.cta-card {
  border-radius: 20px;
}
</style>
