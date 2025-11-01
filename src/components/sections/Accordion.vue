<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Accordeon'"/>
    <v-expansion-panels class="margin_top__default" :multiple="content.multiple">
      <v-expansion-panel
        v-for="(item, index) in content.items"
        :key="index"
        elevation="10"
      >
        <v-expansion-panel-title>
          <div class="d-flex align-center">
            <v-icon v-if="item.icon" :icon="item.icon" :color="info.primaryColor" class="mr-3"/>
            <b v-html="getText(item.title)"/>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-img
            v-if="item.image"
            :src="resolveImg(item.image)"
            :height="isMobile ? 200 : 300"
            cover
            class="mb-4"
          />
          <div v-html="getText(item.content)"/>
          <v-btn
            v-if="item.button && item.url"
            :color="info.primaryColor"
            variant="outlined"
            class="mt-4"
            :href="item.url"
            v-html="getText(item.button)"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>
