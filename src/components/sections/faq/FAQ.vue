<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Domande frequenti'"/>
    <v-expansion-panels class="margin_top__default" variant="accordion">
      <v-expansion-panel
        v-for="(faq, index) in content.faqs"
        :key="index"
        elevation="5"
      >
        <v-expansion-panel-title>
          <b v-html="getText(faq.question)"/>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="getText(faq.answer)"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>
