<template>
  <v-app  v-if="ready">
    <AppBar />
    <UpArrow :bottomOffset="showChatty ? 100 : 20"/>
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

import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { onMounted, watch, ref, computed } from 'vue';
import { useDataStore } from '@/stores/data';

const showChatty = ref(false);
const route = useRoute();
const dataStore = useDataStore();
const { data, ready } = storeToRefs(dataStore);

const backgroundStyle = computed(() => {
  if (data.value.info.bgImg) {
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
  if (route.name == 'Demo') dataStore.initData(route.params.id);
  else dataStore.initData();
});

watch(ready, (newValue) => {
  if (newValue) {
    if (data.value.addOn && data.value.addOn.includes('Chatty')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
      document.body.appendChild(script); 
      showChatty.value = true
    }
  }
});
</script>
