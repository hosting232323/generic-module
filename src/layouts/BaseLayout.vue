<template>
  <v-app v-if="ready">
    <AppBar v-if="!isSpecialPage" />
    <UpArrow
      v-if="!showBubbles"
      :bottom-offset="showChatty ? 100 : 20"
    />
    <SocialBubbles
      v-if="showBubbles || !isSpecialPage"
      :chatty-active="showChatty"
    />
    <v-main :style="backgroundStyle">
      <slot />
    </v-main>
    <AppFooter v-if="!isSpecialPage" />
    <ChattyBot
      v-if="data.addOn?.includes('Chatty')"
      :hostname="http.viteHostname"
      :bot-data="data.chatty"
    />
  </v-app>
</template>

<script setup>
import http from '@/utils/http';
import AppBar from '@/layouts/AppBar.vue';
import AppFooter from '@/layouts/AppFooter.vue';
import UpArrow from '@/layouts/UpArrow.vue';
import ChattyBot from '@/components/ChattyBot.vue';
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

  if (data.value.store) 
    shopStore.initData(data.value.store, () => {});
});
</script>
