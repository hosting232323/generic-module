<!-- ContactPanel.vue -->
<template>
  <v-card class="contact-panel" color="black" elevation="8">
    <v-card-title class="text-h4 font-weight-bold text-center white--text mb-6">
      INIZIA ORA
    </v-card-title>
    
    <v-row justify="center" class="ma-0">
      <v-col cols="4" v-for="(action, index) in actions" :key="index" class="text-center">
        <v-btn
          icon
          x-large
          color="white"
          @click="handleAction(action.type)"
        >
          <v-icon size="48">{{ action.icon }}</v-icon>
        </v-btn>
        <div class="white--text mt-2">{{ action.label }}</div>
      </v-col>
    </v-row>

    <!-- Dialog per la chiamata su desktop -->
    <v-dialog v-model="showCallDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">+39 347 876 8340</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showCallDialog = false">Chiudi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const actions = ref([
  { type: 'phone', icon: 'mdi-phone', label: 'Chiama' },
  { type: 'whatsapp', icon: 'mdi-whatsapp', label: 'WhatsApp' },
  { type: 'email', icon: 'mdi-email', label: 'Email' }
]);

const showCallDialog = ref(false);

const handleAction = (type) => {
  switch (type) {
    case 'phone':
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Dispositivo mobile: avvia la chiamata
        window.location.href = 'tel:+393478768340';
      } else {
        // Desktop: mostra il dialog con il numero
        showCallDialog.value = true;
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
.contact-panel {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}

.v-btn {
  transition: transform 0.2s;
}

.v-btn:hover {
  transform: scale(1.1);
}
</style>