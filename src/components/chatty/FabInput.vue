<template>
  <div 
    v-if="!exportMode"
    class="fab-send"
  >
    <input
      v-model="userMessage"
      type="text"
      placeholder="Scrivi qui..."
      :disabled="loading"
      @keyup.enter="chattyStore.sendMessage(router)"
    >
    <button
      v-if="!loading"
      @click="chattyStore.sendMessage(router)"
    >
      <v-icon>mdi-send-circle</v-icon>
    </button>
    <button
      v-else
      style="cursor: default;"
    >
      <v-icon>mdi-stop-circle</v-icon>
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useChattyStore } from '@/stores/chatty';

const router = useRouter();
const chattyStore = useChattyStore();
const { exportMode, userMessage, loading } = storeToRefs(chattyStore);
</script>
