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
    if (data.value.addOn && data.value.addOn.includes('Chatty')) {
      if(route.meta?.chatty && route.meta?.chatty != 0)
        data.value.info.chattyId = route.meta?.chatty;
      
      if(!route.meta.chatty) return

      const script = document.createElement('script');
      script.type = 'module';
      script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&user_id=${data.value.info.chattyId}`;
      document.body.appendChild(script); 
    }
  }, { immediate: true });

</script>
