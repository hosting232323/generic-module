<template>
  <v-app v-if="ready">
    <AppBar v-if="!isNotFound" />
    <UpArrow
      v-if="!showBubbles"
      :bottom-offset="showChatty ? 100 : 20"
    />
    <SocialBubbles
      v-if="showBubbles || !isNotFound"
      :chatty-active="showChatty"
    />
    <v-main :style="backgroundStyle">
      <slot />
    </v-main>
    <Footer v-if="!isNotFound" />
  </v-app>
</template>

<script setup>
import AppBar from '@/layouts/AppBar.vue';
import Footer from '@/layouts/Footer.vue';
import UpArrow from '@/layouts/UpArrow.vue';
import SocialBubbles from '@/layouts/SocialBubbles.vue';

import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { useDataStore } from '@/stores/data';

const route = useRoute();
const showChatty = ref(false);
const showBubbles = ref(false);
const dataStore = useDataStore();
const { data, ready } = storeToRefs(dataStore);
const isNotFound = computed(() => route.name === 'NotFound');

const backgroundStyle = computed(() => {
  if (data.value.info.backgroundImage)
    return {
      backgroundImage: `url(${data.value.info.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  else
    return {
      backgroundColor: data.value.info.secondaryColor
    };
});

watch(ready, (newValue) => {
  if (!newValue) return;

  if(data.value.info.socialBubbles)
    showBubbles.value = true;

  if (data.value.addOn && data.value.addOn.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
    document.body.appendChild(script); 
    script.onload = () => showChatty.value = true;
    script.onerror = () => showChatty.value = false;
  }
});
</script>
