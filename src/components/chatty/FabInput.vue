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

<style scoped>
.fab-send {
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px -15px 60px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.fab-send input {
  border-radius: 30px 0 0 0;
  height: 70px;
  width: 80%;
  border: none;
  padding-left: 40px;
  font-size: 17px;
  color: #969ba6;
  outline: none;
  background-color: #fff;
}

.fab-send input:focus {
  color: #000;
}

.fab-send input:not(:placeholder-shown) {
  color: #000;
}

.fab-send button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 20%;
  font-size: 20px;
  background-color: #fff;
  color: var(--theme-color);
  border: none;
  border-radius: 0 30px 0 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.fab-send button:hover {
  color: var(--theme-color-hover);
}

@media (min-width: 768px) and (max-width: 1440px) {
  .fab-send {
    height: 60px;
  }
  .fab-send input {
    height: 60px;
    font-size: 15px;
  }

  .fab-send button {
    height: 60px;
    font-size: 18px;
  }
}
</style>
