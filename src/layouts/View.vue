<template>
  <v-main :style="{ backgroundColor: data.info.secondaryColor }">
    <router-view />
    <a href="https://www.instagram.com/dicarne_showroom/">
      <v-btn icon="mdi-instagram" :color="data.info.primaryColor" class="fixed-btn" size="x-large" />
    </a>
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

<style scoped>
  .fixed-btn {
    position: fixed;
    bottom: 64px;
    right: 16px;
  }
</style>
