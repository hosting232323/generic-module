<template>
  <v-main :style="{ backgroundColor: data.info.secondaryColor }">
    <router-view />
  </v-main>
</template>

<script setup>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const route = useRoute();

watch(route, () => {
  if(!route.meta?.chatty) return;

  let chattyId = route.meta.chatty;
  if (chattyId == 0) {
    if (!(
      data.value.addOn &&
      data.value.addOn.includes('Chatty') &&
      data.value.info.chattyId
    )) return;

    chattyId = data.value.info.chattyId;
  }
  const script = document.createElement('script');
  script.type = 'module';
  script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${chattyId}`;
  document.body.appendChild(script);
}, { immediate: true });
</script>
