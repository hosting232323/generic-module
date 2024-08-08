<template>
  <v-container>
    <v-row align="center">
      <v-col v-if="isLeftAligned" cols="12" md="6">
        <v-img :src="content.image" cover class="bento-img"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <!-- Use TypeWriter for Title -->
        <TypeWriter 
          v-if="content.title" 
          :texts="[content.title]" 
          :typing-speed="80" 
          :erasing-speed="80" 
          :new-text-delay="1500"
        />
        <br>
        <v-typography v-if="content.subtitle" class="text-subtitle-1 font-weight-black" v-html="content.subtitle + '<br>'" />
        <v-typography v-if="content.description" v-html="content.description" />
        <br>
        <a :href="content.url" v-if="content.url && content.button">
          <v-btn
            v-html="content.button" 
            class="text-none"
            variant="flat"
            :style="{ marginTop: '7px' }">
          </v-btn>
        </a>
      </v-col>
      <v-col v-if="!isLeftAligned" cols="12" md="6">
        <v-img :src="content.image" cover class="bento-img"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import mobile from '@/utils/mobile';
import TypeWriter from '@/components/AnimatedTitle.vue'

const isMobile = mobile.setupMobileUtils();
const { content, info } = defineProps(['content', 'info']);

const defaultDesktopOrientation = 'right';
const defaultMobileOrientation = 'bottom';

const isLeftDesktopAligned = computed(() => (content.orientationDesktop || defaultDesktopOrientation) === 'left');
const isLeftMobileAligned = computed(() => (content.orientationMobile || defaultMobileOrientation) === 'top');

const isLeftAligned = computed(() => {
  if (isMobile.value) return isLeftMobileAligned.value;
   else return isLeftDesktopAligned.value;
});
</script>

<style scoped>
.bento-img {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
}

.bento-sheet {
  border-radius: 15px;
  padding: 16px;
}
</style>
