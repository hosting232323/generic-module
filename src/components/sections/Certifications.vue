<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Certificazioni'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(cert, index) in content.certifications"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 4"
      >
        <v-card elevation="10" class="cert-card text-center pa-6">
          <v-img
            :src="resolveImg(cert.image)"
            :height="isMobile ? 150 : 200"
            contain
            class="mb-4"
          />
          <h3 class="mb-2" :style="{ color: info.primaryColor }" v-html="getText(cert.name)"/>
          <p v-if="cert.issuer" class="text-subtitle-2 mb-2" v-html="getText(cert.issuer)"/>
          <p v-if="cert.date" class="text-caption text-grey">{{ cert.date }}</p>
          <v-btn
            v-if="cert.url"
            :color="info.primaryColor"
            variant="outlined"
            class="mt-4"
            :href="cert.url"
            target="_blank"
          >
            {{ getText('Verifica') || 'Verifica' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.cert-card {
  transition: transform 0.3s ease;
  height: 100%;
}
.cert-card:hover {
  transform: scale(1.05);
}
</style>
