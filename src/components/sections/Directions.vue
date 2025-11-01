<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Come arrivare'"/>
    <v-row class="margin_top__default">
      <v-col cols="12" :md="content.mapPosition === 'left' ? 6 : 12" :order="content.mapPosition === 'right' ? 2 : 1">
        <Map :content="{ coordinates: content.coordinates }" :info="info"/>
      </v-col>
      <v-col cols="12" :md="content.mapPosition === 'left' ? 6 : 12" :order="content.mapPosition === 'right' ? 1 : 2">
        <v-card elevation="10">
          <v-card-text>
            <div v-if="content.address" class="mb-4">
              <v-icon icon="mdi-map-marker" :color="info.primaryColor" class="mr-2"/>
              <span class="font-weight-bold">{{ getText('Indirizzo') || 'Indirizzo' }}:</span>
              <p class="ml-8" v-html="getText(content.address)"/>
            </div>
            <div v-if="content.directions">
              <h3 class="mb-3" :style="{ color: info.primaryColor }">{{ getText('Indicazioni') || 'Indicazioni' }}</h3>
              <div v-html="getText(content.directions)"/>
            </div>
            <v-divider v-if="content.transportOptions" class="my-4"/>
            <div v-if="content.transportOptions">
              <h3 class="mb-3" :style="{ color: info.primaryColor }">{{ getText('Mezzi pubblici') || 'Mezzi pubblici' }}</h3>
              <v-list density="compact">
                <v-list-item
                  v-for="(option, index) in content.transportOptions"
                  :key="index"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="option.icon" :color="info.primaryColor"/>
                  </template>
                  <v-list-item-title v-html="getText(option.text)"/>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import Map from '@/components/sections/Map.vue';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>
