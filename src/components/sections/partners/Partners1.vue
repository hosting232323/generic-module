<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(partner, index) in content" :key="index" cols="6" sm="4" md="3" lg="2">
        <div class="partner-logo" @click="handleClick(partner)">
          <v-img :src="resolveImg(partner.logo)" :alt="getText(partner.name)" contain max-height="80"></v-img>
        </div>
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
.partner-logo {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0.6;
  border-radius: 8px;
}

.partner-logo:hover {
  transform: scale(1.1);
  opacity: 1;
}
</style>
