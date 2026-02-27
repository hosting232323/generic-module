<template>
  <v-container>
    <v-row align="center">
      <v-col
        v-for="contentType in contentTypes"
        :key="contentType"
        :cols="isMobile ? 12 : 6"
        md="6"
      >
        <v-img
          v-if="contentType == 'image'"
          :src="resolveImg(content.image)"
          cover
        />

        <v-sheet
          v-else
          style="background-color: transparent;"
        >
          <p
            v-if="content.title"
            class="text-h3 font-weight-black"
            :style="{ color: info.primaryColor + ' !important' }"
            v-html="getText(content.title)"
          />          <br>
          <p
            v-if="content.subtitle"
            class="text-subtitle-1 font-weight-black"
            v-html="getText(content.subtitle) + '<br>'"
          />
          <p
            v-if="content.description"
            v-html="getText(content.description)"
          />
          <br>
          <a
            v-if="content.url && content.button"
            :href="content.url"
          >
            <v-btn
              class="text-none"
              variant="flat"
              :color="info.primaryColor"
              :style="{ marginTop: '7px' }"
            >
              <span v-html="getText(content.button)" />
            </v-btn>
          </a>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps({
  content: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    required: true
  }
});

const contentTypes = computed(() => {
  if (isMobile.value)
    return (content.orientationMobile || 'bottom') === 'bottom' ? ['text', 'image'] : ['image', 'text'];
  else
    return (content.orientationDesktop || 'right') === 'right' ? ['text', 'image'] : ['image', 'text'];
});
</script>
