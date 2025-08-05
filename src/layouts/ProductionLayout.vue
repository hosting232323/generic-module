<template>
  <v-app  v-if="ready">
    <AppBar />
    <UpArrow v-if="!showBubbles" :bottomOffset="showChatty ? 100 : 20"/>
    <SocialBubbles v-if="showBubbles" :chattyActive="showChatty"/>
    <v-main :style="backgroundStyle">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import UpArrow from './UpArrow.vue';
import AppBar from './AppBar.vue';
import Footer from './Footer.vue';
import SocialBubbles from './SocialBubbles.vue';

import { storeToRefs } from 'pinia';
import { onMounted, watch, ref, computed } from 'vue';
import { useDataStore } from '@/stores/data';
import { useShopStore } from '@/stores/shop';

const showChatty = ref(false);
const showBubbles = ref(false);
const dataStore = useDataStore();
const shopStore = useShopStore();
const { data, ready } = storeToRefs(dataStore);

const backgroundStyle = computed(() => {
  if (data.value.info.backgroundImage) {
    return {
      backgroundImage: `url(${data.value.info.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  } else {
    return {
      backgroundColor: data.value.info.secondaryColor
    };
  }
});

onMounted(() => {
  dataStore.initData();
  shopStore.initData(data.value.store.userId);
});

watch(ready, (newValue) => {
  if (!newValue) return

  const addOn = data.value.addOn;
  if (addOn && addOn.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
    document.body.appendChild(script); 
    script.onload = () => {
      showChatty.value = true;
    };
    script.onerror = () => {
      showChatty.value = false;
    };
  }

  if(data.value.info.socialBubbles) {
    showBubbles.value = true;
  }
});
</script>
