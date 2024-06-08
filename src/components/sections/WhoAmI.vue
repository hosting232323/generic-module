<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <h1 :style="{ color: info.primaryColor }">
          Chi sono
        </h1>
      </v-col>
      <v-col cols="2">
        <v-btn v-if="!isAudioPlaying" @click="startAudio" icon="mdi-volume-high" :style="{ color: info.primaryColor }" />
        <audio ref="backgroundAudio" loop muted>
          <source src="/audio.mp3" type="audio/mpeg">
          <source src="/audio.ogg" type="audio/ogg">
          Il tuo browser non supporta l'elemento audio.
        </audio>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <center>
          <v-avatar image="/avatar.jpeg" size="200" />
        </center>
      </v-col>
      <v-col cols="12" sm="8" class="body_text_container">
        <div>
          <h1>Caterina</h1>
          L'obiettivo che mi sono posta, aprendo questa casa vacanze, è quello di voler contribuire, nel mio piccolo, alla conoscenza della nostra regione e alla diffusione delle nostre tradizioni,
          ospitando il maggior numero di persone. Nonostante quella dell'host non sia la mia principale attività, ho iniziato questa avventura con grande determinazione e Amore.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';

  const { content, info } = defineProps(['content', 'info']);

  const backgroundAudio = ref(null);
  const isAudioPlaying = ref(false);

  const startAudio = () => {
    if (backgroundAudio.value) {
      backgroundAudio.value.muted = false;
      backgroundAudio.value.play().then(() => {
        isAudioPlaying.value = true;
      }).catch(error => {
        console.log('Errore nella riproduzione audio:', error);
      });
    }
  };
</script>

<style scoped>
  .body_text_container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
