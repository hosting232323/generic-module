<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri servizi'"/>
    <v-expansion-panels multiple>
      <v-expansion-panel elevation="20" v-for="service in content.services" class="margin_top__default">
        <v-expansion-panel-title>
          <b v-html="getText(service.name)"/>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="getText(service.description)" />
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
