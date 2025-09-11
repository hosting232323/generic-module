<template>
  <v-app  v-if="ready">
    <AppBar v-if="!isNotFound" />
    <UpArrow v-if="!showBubbles" :bottomOffset="showChatty ? 100 : 20"/>
    <SocialBubbles v-if="showBubbles || !isNotFound" :chattyActive="showChatty"/>
    <v-main :style="backgroundStyle">
      <router-view />
    </v-main>
    <Footer v-if="!isNotFound" />
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router'
import UpArrow from './UpArrow.vue';
import AppBar from './AppBar.vue';
import Footer from './Footer.vue';
import SocialBubbles from './SocialBubbles.vue';

import { storeToRefs } from 'pinia';
import { onMounted, watch, ref, computed } from 'vue';
import { useDataStore } from '@/stores/data';
import { useShopStore } from '@/stores/shop';
import { useBlogStore } from '@/stores/blog';

const showChatty = ref(false);
const showBubbles = ref(false);
const dataStore = useDataStore();
const shopStore = useShopStore();
const blogStore = useBlogStore();
const { data, ready } = storeToRefs(dataStore);

const route = useRoute();
const isNotFound = computed(() => route.name === 'NotFound');

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

  if (data.value.store && data.value.store.userId)
    shopStore.initData(store.userId);
  else 
    shopStore.initData(data.value.shop);

  if (data.value.blog && data.value.blog.length > 0)
    blogStore.initData(data.value.blog);
  else
    blogStore.initData('doriana');
});

watch(ready, (newValue) => {
  if (!newValue) return

  const addOn = data.value.addOn;
  if (addOn && addOn.includes('Chatty') && !isNotFound) {
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
