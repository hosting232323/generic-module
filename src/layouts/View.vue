<template>
  <v-main :style="{ backgroundColor: data.info.secondaryColor }">
    <Home />
  </v-main>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  import Home from '@/views/Home.vue';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  if (data.value.addOn && data.value.addOn.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&bot_id=${data.value.info.chattyId}`;
    document.body.appendChild(script); 
  }
</script>
