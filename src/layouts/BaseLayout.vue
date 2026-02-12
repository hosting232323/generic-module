<template>
  <v-app  v-if="ready">
    <AppBar v-if="!isSpecialPage" />
    <UpArrow v-if="!showBubbles" :bottomOffset="showChatty ? 100 : 20"/>
    <SocialBubbles v-if="showBubbles || !isSpecialPage" :chattyActive="showChatty"/>
    <v-main :style="backgroundStyle">
      <slot />
    </v-main>
    <Footer v-if="!isSpecialPage" />
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
import { useShopStore } from '@/stores/shop';

const route = useRoute();
const showChatty = ref(false);
const showBubbles = ref(false);
const dataStore = useDataStore();
const { data, ready } = storeToRefs(dataStore);
const isSpecialPage = computed(() => {
  return ['NotFound', 'Pagamento Riuscito', 'Pagamento Fallito'].includes(route.name);
});
const shopStore = useShopStore();

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
    script.src = `https://panificio-mulinobianco.it/chatty-be/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
    document.body.appendChild(script); 
    script.onload = () => showChatty.value = true;
    script.onerror = () => showChatty.value = false;
  }
  
  if (data.value.store) 
    shopStore.initData(data.value.store, () => {});
});
</script>
