<template>
  <AppBar :info="info" :components="components" :addOn="addOn"/>
  <UpArrow v-if="!showBubbles" :bottomOffset="showChatty ? 100 : 20"/>
  <SocialBubbles v-if="showBubbles" :chattyActive="showChatty"/>
  <v-main :style="backgroundStyle">
    <Home />
  </v-main>
  <Footer :info="info"/>
</template>

<script setup>
import UpArrow from './UpArrow.vue';
import AppBar from './AppBar.vue';
import Home from '../views/Home.vue';
import Footer from './Footer.vue';
import SocialBubbles from './SocialBubbles.vue';
import { defineProps } from 'vue';

// import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { onMounted, watch, ref, computed } from 'vue';
// import { useDataStore } from '@/stores/data';

const showChatty = ref(false);
const showBubbles = ref(false);
const route = useRoute();
// const dataStore = useDataStore();
// const { data, ready } = storeToRefs(dataStore);
const props = defineProps({
  data: {
    default: null,
  }
});

const info = props.data.info;
const components = props.data.components;
const addOn = props.data.addOn;

const backgroundStyle = computed(() => {
  if (info.backgroundImage) {
    return {
      backgroundImage: `url(${info.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  } else {
    return {
      backgroundColor: info.secondaryColor
    };
  }
});

onMounted(() => {
  if (addOn && addOn.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${info.chattyId}`;
    document.body.appendChild(script); 
    script.onload = () => {
      showChatty.value = true;
    };
    script.onerror = () => {
      showChatty.value = false;
    };
  }

  if(info.socialBubbles) {
    showBubbles.value = true;
  }
});
</script>
