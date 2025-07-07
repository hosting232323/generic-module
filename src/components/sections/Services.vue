<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri servizi'"/>
    <v-expansion-panels v-model="activePanel">
      <v-expansion-panel elevation="20" v-for="service in content.services" class="margin_top__default">
        <v-expansion-panel-title>
          <b v-html="getText(service.name)"/>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row align="stretch" class="d-flex">
            <v-col cols="12" md="6" class="d-flex">
              <img
                v-if="service.image"
                :src="resolveImg(service.image)"
                alt=""
                class="service-img"
              />
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
              <div v-html="getText(service.description)" />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
const activePanel = ref(0);
</script>

<style scoped>
.service-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* border-radius: 4px; */
  max-height: 300px;
}
</style>