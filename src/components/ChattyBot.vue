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
  document.documentElement.style.setProperty('--dot-color', '#fff');
  document.documentElement.style.setProperty('--border-color', '#eaeaea');
  document.documentElement.style.setProperty('--theme-color', palette.theme_color);
  document.documentElement.style.setProperty('--theme-color-hover', palette.theme_color_hover);
  document.documentElement.style.setProperty('--fab-hover', palette.fab_hover);
  document.documentElement.style.setProperty('--fab-shadow', palette.fab_shadow);
  document.documentElement.style.setProperty('--fab-border', palette.fab_border);
}, { immediate: true });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.fab {
  position: fixed;
  height: 4rem;
  bottom: 0;
  right: 0;
  margin: 30px;
  width: 4rem;

  background: var(--theme-color);
  box-shadow: 0px 5px 20px var(--fab-shadow);

  border: 1px solid var(--fab-border);
  border-radius: 50%;
  border-bottom-right-radius: 6px;
  
  cursor: pointer;
  z-index: 99;

  transform: scale(1);
  transform-origin: bottom right;
  transition: all 0.3s ease;
  
}

.fab:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
}

.fab:hover {
  background: var(--fab-hover);
  box-shadow: 0px 5px 20px 5px var(--fab-shadow);
}

.fab-dots {
  position: absolute;
  height: 8px;
  width: 8px;
  background-color: var(--dot-color);
  border-radius: 50%;
  top: 50%;
  transform: translateX(0%) translateY(-50%) rotate(0deg);
  opacity: 1;
  animation: blink 3s ease infinite;
  transition: all 0.3s ease;
}

@keyframes blink {
  50% {
    opacity: 0.25;
  }
}

.fab-dots-1 {
  left: 15px;
  animation-delay: 0s;
}

.fab-dots-2 {
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  animation-delay: 0.4s;
}

.fab-dots-3 {
  right: 15px;
  animation-delay: 0.8s;
}

.fab .fab-dots-2 {
  transform: translateX(-50%) translateY(-50%) rotate(0deg);
}

.fab-wheel {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 45px;
  height: calc(100vh - 150px);
  width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  color: white;
  background-color: #eaeef3;
  z-index: 9999;
  transform: scale(0);
  transform-origin: bottom right;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-family: 'Roboto', sans-serif;
}

@media (min-width: 768px) and (max-width: 1440px) {
  .fab-wheel {
    height: 85vh;
    margin: 20px;
  }
}

@media screen and (max-width: 768px) {
  .fab {
    height: 60px;
    width: 60px;
    margin: 15px;
  }

  .fab-dots {
    height: 6px;
    width: 6px;
  }

  .fab-wheel {
    margin: 0;
    height: 100%;
    width: 100vw;
    border-radius: 0;
  }
}
</style>
