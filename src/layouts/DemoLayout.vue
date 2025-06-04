<template>
  <v-app v-if="props.data">
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
import { ref, watch, computed } from 'vue';
import { defineProps } from 'vue';
import UpArrow from './UpArrow.vue';
import AppBar from './AppBar.vue';
import Home from '../views/Home.vue';
import Footer from './Footer.vue';
import SocialBubbles from './SocialBubbles.vue';

const showChatty = ref(false);
const showBubbles = ref(false);

const props = defineProps({
  data: Object
});

const backgroundStyle = computed(() => {
  const info = props.data.info;
  if (info.backgroundImage) {
    return {
      backgroundImage: `url(${info.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  } else {
    return {
      backgroundColor: info.secondaryColor || '#fff'
    };
  }
});

watch(() => props.data, (newData) => {
  if (!newData) return;

  const addOn = newData.addOn;
  if (addOn.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${newData.info.chattyId}`;
    document.body.appendChild(script); 
    script.onload = () => {
      showChatty.value = true;
    };
    script.onerror = () => {
      showChatty.value = false;
    };
  }

  if (newData.info.socialBubbles) {
    showBubbles.value = true;
  }
}, { immediate: true });
</script>
