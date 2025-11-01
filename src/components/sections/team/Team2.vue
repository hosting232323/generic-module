<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <CarouselWrapper
      :items="content"
      :primaryColor="info.primaryColor"
      :itemKey="(item, index) => getText(item.name) + '-' + index"
      class="margin_top__default"
    >
      <template #default="{ item }">
        <v-card elevation="2" class="team-carousel-card mx-2">
          <v-row no-gutters>
            <v-col cols="12" md="5">
              <v-img :src="resolveImg(item.image)" :height="isMobile ? 300 : 400" cover/>
            </v-col>
            <v-col cols="12" md="7" class="pa-6">
              <h2 class="text-h4 font-weight-bold mb-2">{{ getText(item.name) }}</h2>
              <p class="text-subtitle-1 text-primary mb-4">{{ getText(item.role) }}</p>
              <p v-if="item.description" class="text-body-1">{{ getText(item.description) }}</p>
              <div v-if="item.social" class="mt-6">
                <v-btn
                  v-for="(url, platform) in item.social"
                  :key="platform"
                  :icon="`mdi-${platform}`"
                  :href="url"
                  target="_blank"
                  color="primary"
                  variant="text"
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </CarouselWrapper>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);
</script>

<style scoped>
.team-carousel-card {
  height: 100%;
}
</style>
