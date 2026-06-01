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

<style scoped>
.fab-nav {
  height: 125px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  position: relative;
}

.fab-nav i {
  color: var(--theme-color);
  font-size: 30px;
  cursor: pointer;
  width: 30px;
  transition: color 0.3s ease;
}

.fab-nav i:hover {
  color: var(--theme-color-hover);
}

.avatar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.avatar img {
  width: 50px;
}

.avatar p {
  color: #000;
  font-size: 16px;
  margin: 5px 0;
}

.close {
  width: 32px;
  height: 32px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close .line {
  width: 35px;
  height: 5px;
  background-color: var(--theme-color);
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  transition: background-color 0.3s ease;
}

.close:hover .line {
  background-color: var(--theme-color-hover);
}

.line:nth-child(1) {
  transform: rotate(45deg);
}

.line:nth-child(2) {
  transform: rotate(-45deg);
}

@media (min-width: 768px) and (max-width: 1440px) {
  .fab-nav {
    height: 100px;
  }
  .avatar p {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .fab-nav {
    height: 75px;
    border-radius: 0;
    width: 100vw;
  }

  .avatar p {
    margin-top: 0px;
    margin-bottom: 10px;
  }
}

</style>
