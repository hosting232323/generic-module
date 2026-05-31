<template>
  <div
    ref="fabButton"
    class="fab"
    @click="toggleWheel('open')"
  >
    <div class="fab-dots fab-dots-1" />
    <div class="fab-dots fab-dots-2" />
    <div class="fab-dots fab-dots-3" />
  </div>
  <div
    ref="fabWheel"
    class="fab-wheel"
  >
    <FabNav @toggle-wheel="toggleWheel" />
    <FabContent />
    <FabInput />
    <FabFooter />
  </div>
</template>

<script setup>
import '@/styles/chatty.scss';
import { ref, computed, watch } from 'vue';
import { useChattyStore } from '@/stores/chatty';

import FabNav from '@/components/chatty/FabNav';
import FabInput from '@/components/chatty/FabInput';
import FabFooter from '@/components/chatty/FabFooter';
import FabContent from '@/components/chatty/FabContent';

const fabWheel = ref(null);
const fabButton = ref(null);
const chattyStore = useChattyStore();

const { hostname, botData } = defineProps({
  hostname: {
    type: String,
    required: true
  },
  botData: {
    type: Object,
    required: true
  }
});

chattyStore.initData(botData, hostname);

const colorPaletteDefault = {
  theme_color: '#126EE2',
  theme_color_hover: '#2C87E8',
  fab_hover: '#2C87E8',
  fab_shadow: '#81A4F1',
  fab_border: '#0C50A7'
};

const toggleWheel = (mode) => {
  fabWheel.value.style.transform = mode == 'open' ? 'scale(1)' : 'scale(0)';
  fabButton.value.style.transform = mode == 'open' ? 'scale(0)' : 'scale(1)';
};

const colorPalette = computed(() => {
  return botData.color || colorPaletteDefault;
});

watch(colorPalette, (palette) => {
  document.documentElement.style.setProperty('--theme-color', palette.theme_color);
  document.documentElement.style.setProperty('--theme-color-hover', palette.theme_color_hover);
  document.documentElement.style.setProperty('--fab-hover', palette.fab_hover);
  document.documentElement.style.setProperty('--fab-shadow', palette.fab_shadow);
  document.documentElement.style.setProperty('--fab-border', palette.fab_border);
}, { immediate: true });
</script>
