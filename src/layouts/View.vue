<template>
  <v-main :style="{ backgroundColor: data.info.secondaryColor }">
    <router-view />
  </v-main>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  import { useRouter, useRoute } from 'vue-router';
  import { watch } from 'vue';
  
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  const route = useRoute();

  watch(route, () => {
    data.value.info.chattyId = route.meta?.chatty ?? route.params.id;
    console.log(data.value.info.chattyId);
    console.log(`Route: ${route.path}, Chatty: ${data.value.info.chattyId}`);
  }, { immediate: true });

  if (data.value.addOn && data.value.addOn.includes('Chatty')) {
    console.log(data.value.info.chattyId);
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
    document.body.appendChild(script); 
  }
</script>