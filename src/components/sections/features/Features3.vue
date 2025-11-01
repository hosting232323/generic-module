<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor, textAlign: 'center' }" v-html="getText(content.title)"/>
    <v-tabs v-model="tab" :color="info.primaryColor" class="margin_top__default" align-tabs="center">
      <v-tab v-for="(feature, index) in content.features" :key="index" :value="index">
        <v-icon :icon="feature.icon" class="mr-2"/>
        <span v-html="getText(feature.name)"/>
      </v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-6">
      <v-window-item v-for="(feature, index) in content.features" :key="index" :value="index">
        <v-card elevation="10" class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="6" class="text-center">
              <v-avatar :color="info.primaryColor" size="150">
                <v-icon :icon="feature.icon" size="80" color="white"/>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="6">
              <h2 class="mb-4" :style="{ color: info.primaryColor }" v-html="getText(feature.name)"/>
              <p class="text-h6" v-html="getText(feature.description)"/>
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const tab = ref(0);
</script>
