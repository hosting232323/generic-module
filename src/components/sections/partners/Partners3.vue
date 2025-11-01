<template>
  <v-container fluid class="partners-banner">
    <v-container>
      <v-row v-if="info?.title" justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold text-white mb-4">{{ getText(info.title) }}</h2>
          <p v-if="info.subtitle" class="text-h6 text-white">{{ getText(info.subtitle) }}</p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col v-for="(partner, index) in content" :key="index" cols="6" sm="4" md="2">
          <div class="partner-logo-white" @click="handleClick(partner)">
            <v-img :src="resolveImg(partner.logo)" :alt="getText(partner.name)" contain max-height="60" class="logo-filter"></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
.partners-banner {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  padding: 80px 0;
}

.partner-logo-white {
  padding: 16px;
  cursor: pointer;
  transition: transform 0.3s;
}

.partner-logo-white:hover {
  transform: scale(1.1);
}

.logo-filter {
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.3s;
}

.partner-logo-white:hover .logo-filter {
  opacity: 1;
}
</style>
