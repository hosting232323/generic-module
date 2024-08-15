<template>
  <v-btn 
    class="up-arrow-button" 
    @click="scrollToTop" 
    fab 
    small
    v-show="isVisible"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  if (window.scrollY >= 250) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.up-arrow-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgb(2, 2, 48); /* Colore del pulsante */
  color: white; /* Colore dell'icona */
}

.up-arrow-button:hover {
  background-color: darkblue; /* Colore del pulsante al passaggio del mouse */
}
</style>
