<template>
  <!--
    Sistemare seconda immagine
    Caricamento brandlist
    Scorrimento automatico gallery
    Titolo sito sospeso sopra la gallery
    Floating button per instagram
    Logo sul sito
    Scrivere Puglia Basilicata
  -->
  <Gallery v-if="data.gallery" />
  <Services id="services" />
  <v-container v-if="data.contacts">
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Brandlist id="brandlist" />
  <v-container v-if="data.contacts">
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Contacts id="contacts" v-if="data.contacts" />
</template>

<script setup>
  import Gallery from '@/components/Gallery';
  import Services from '@/components/Services';
  import Contacts from '@/components/Contacts';
  import Brandlist from '@/components/Brandlist';

  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
