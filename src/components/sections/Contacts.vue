<template>
  <div>
  <v-card-title class="text-h5 text-center mb-6 fixed-height">
    <div class="typewriter-wrapper">
      <TypeWriter 
        :texts="['Scopri la nostra offerta...']" 
        :typing-speed="80" 
        :erasing-speed="80" 
        :new-text-delay="1500"
        class="text-subtitle-1 font-weight-black shifted-typewriter"
      />
    </div>
  </v-card-title>
  <v-row justify="center" class="ma-0">
    <v-col cols="4" v-for="(action, index) in actions" :key="index" class="text-center">
      <v-btn
        icon
        x-large
        :color="action.color"
        @click="handleAction(action.type)"
      >
        <v-icon size="48">{{ action.icon }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-snackbar
    v-model="showCopiedMessage"
    :timeout="2000"
    color="success"
    text
  >
    Numero copiato
  </v-snackbar>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';
import TypeWriter from '@/components/AnimatedTitle.vue';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;

const actions = ref([
  { type: 'phone', icon: 'mdi-phone', label: 'Chiama', color: 'green' },
  { type: 'whatsapp', icon: 'mdi-whatsapp', label: 'WhatsApp', color: 'green' },
  { type: 'email', icon: 'mdi-email', label: 'Email', color: 'red' }
]);

const showCopiedMessage = ref(false);

const handleAction = (type) => {
  switch (type) {
    case 'phone':
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Dispositivo mobile: avvia la chiamata
        window.location.href = 'tel:+393478768340';
      } else {
        // Desktop: copia il numero negli appunti e mostra il messaggio
        navigator.clipboard.writeText('+393478768340').then(() => {
          showCopiedMessage.value = true;
        });
      }
      break;
    case 'whatsapp':
      window.open('https://wa.me/393478768340', '_blank');
      break;
    case 'email':
      window.location.href = 'mailto:giovanni.colasanto@fastsite.it';
      break;
  }
};
</script>

<style scoped>
.fixed-height {
  min-height: 50px; /* Adjust the height as necessary */
}

.typewriter-wrapper {
  min-height: 50px; /* Adjust the height as necessary */
  display: flex;
  justify-content: flex-start; /* Align to the left */
  padding-left:  12%; /* Adjust padding to shift the text */
  text-align: left;
}

.shifted-typewriter {
  display: inline-block; /* Ensure the typewriter is inline for better centering */
}

.contact-panel {
  width: 100%;
  padding: 2rem;
  margin-top: 200rem;
  margin-bottom: 200rem; 
}

.v-btn {
  transition: transform 0.2s;
  margin: 0 10px;
  margin-bottom: 5rem; 
}

.v-btn:hover {
  transform: scale(1.1);
}

/* Set text color for better visibility */
.v-card-title, .v-col div {
  color: white;
}
</style>
