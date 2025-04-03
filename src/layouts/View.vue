<template>
  <v-main :style="{ backgroundColor: info.secondaryColor }">
    <Home :info="info" :components="components" />
  </v-main>
</template>

<script setup>
  // import { storeToRefs } from 'pinia';
  // import { useDataStore } from '@/stores/data';
  import { computed } from 'vue';
  import Home from '@/views/Home.vue';

  const props = defineProps({
    info: {
      type: Object,
      required: true
    },
    addOn: {
      type: Array,
      default: () => []
    },
    components: {
      type: Object,
      required: true
    }
  });

  const info = computed(() => props.info);
  const addOn = computed(() => props.addOn);
  const components = computed(() => props.components);

  // const dataStore = useDataStore();
  // const { data } = storeToRefs(dataStore);

  if (addOn && addOn.value.includes('Chatty')) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `https://chatty-be.replit.app/chat-file/js?file=inject&bot_id=${info.value.chattyId}`;
    document.body.appendChild(script); 
  }
</script>
