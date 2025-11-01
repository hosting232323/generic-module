<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(partner, index) in content" :key="index" cols="12" sm="6" md="4">
        <v-card class="partner-card" elevation="2" @click="handleClick(partner)">
          <v-card-text class="pa-6 text-center">
            <v-img :src="resolveImg(partner.logo)" :alt="getText(partner.name)" contain max-height="100" class="mb-4"></v-img>
            <h4 class="text-h6 font-weight-bold mb-2">{{ getText(partner.name) }}</h4>
            <p v-if="partner.description" class="text-body-2">{{ getText(partner.description) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const handleClick = (partner) => {
  if (partner.link) window.open(partner.link, '_blank');
};
</script>

<style scoped>
.partner-card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
}

.partner-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
}
</style>
