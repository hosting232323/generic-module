<template>
  <nav class="fab-nav">
    <v-icon
      v-if="!exportMode"
      @click="exportMode = true"
    >
      mdi-content-save
    </v-icon>
    <v-icon
      v-if="exportMode"
      @click="exportMode = false"
    >
      mdi-restore
    </v-icon>
    <div class="avatar">
      <img
        :src="data.image"
        alt="botAvatar"
      >
      <p>{{ data.name }}</p>
    </div> 
    <div
      class="close"
      @click="emit('toggle-wheel', 'close')"
    >
      <div class="line" />
      <div class="line" />
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useChattyStore } from '@/stores/chatty';

const chattyStore = useChattyStore();
const { data, exportMode } = storeToRefs(chattyStore);
const emit = defineEmits(['toggle-wheel']);
</script>
