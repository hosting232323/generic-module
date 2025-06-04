<template>
  <v-app v-if="ready">
    <AppBar />
    <UpArrow v-if="!showBubbles" :bottomOffset="showChatty ? 100 : 20"/>
    <SocialBubbles v-if="showBubbles" :chattyActive="showChatty"/>
    <v-main :style="backgroundStyle">
      <Home />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import AppBar from './AppBar.vue';
import UpArrow from './UpArrow.vue';
import Footer from './Footer.vue';
import SocialBubbles from './SocialBubbles.vue';
import Home from '../views/Home.vue';

import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const showChatty = ref(false);
const showBubbles = ref(false);

const route = useRoute();
const dataStore = useDataStore();
const { data, ready } = storeToRefs(dataStore);

onMounted(() => {
  const dataId = route.params.id;
  dataStore.initData(dataId);
});

watch(ready, (newVal) => {
  if (!newVal) return;

  const addOn = data.value.addOn;

  if (addOn?.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
    document.body.appendChild(script);
    script.onload = () => { showChatty.value = true };
    script.onerror = () => { showChatty.value = false };
  }

  if (data.value.info?.socialBubbles) {
    showBubbles.value = true;
  }
});

const backgroundStyle = computed(() => {
  const info = data.value.info || {};
  if (info.backgroundImage) {
    return {
      backgroundImage: `url(${info.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }
  return {
    backgroundColor: info.secondaryColor || '#ffffff',
  };
});
</script>
