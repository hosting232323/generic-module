<template>
  <v-main >
    <router-view />
  </v-main>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  if (data.value.addOn && data.value.addOn.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&bot_id=${data.value.info.chattyId}`;
    document.body.appendChild(script); 
  }
</script>
