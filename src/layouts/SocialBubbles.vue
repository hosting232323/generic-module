<template>
  <div
    v-for="(social, index) in content.socialBubbles"
    :key="index"
    class="social-container shadown"
    :style="{
      bottom: `${(chattyActive ? 100 : 20) + index * 70}px`,
      backgroundColor: 'transparent'
    }"
  >
    <a :href="social.url" target="_blank" rel="noopener noreferrer">
      <v-btn
        :icon="SOCIAL_ICON_MAP[social.type]"
        :style="{ backgroundColor: info.primaryColor, color: '#fff' }"
        size="x-large"
      />
    </a>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const content = data.value.components.find(c => c.type === 'socialBubbles');
const info = data.value.info;

defineProps({
  chattyActive: Boolean
});

const SOCIAL_ICON_MAP = {
  Email: 'mdi-email',
  Phone: 'mdi-phone',
  TikTok: 'mdi-music',
  Twitter: 'mdi-twitter',
  YouTube: 'mdi-youtube',
  WhatsApp: 'mdi-whatsapp',
  Facebook: 'mdi-facebook',
  LinkedIn: 'mdi-linkedin',
  Address: 'mdi-map-marker',
  Instagram: 'mdi-instagram'
};
</script>

<style scoped>
.social-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  border-radius: 100%;
  z-index: 999;
  cursor: pointer;
}

.shadown {
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 20%);
  transition: box-shadow 225ms;
}

.shadown:hover {
  box-shadow: 0px 10px 14px 0px rgba(0, 0, 0, 0.2);
}
</style>
