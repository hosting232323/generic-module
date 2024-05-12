<template>
  <Gallery v-if="data.gallery" />
  <Services id="services" v-if="data.services" />
  <v-container v-if="data.advantages">
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Advantages id="advantages" v-if="data.advantages" />
  <v-container v-if="data.contacts">
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Contacts id="contacts" v-if="data.contacts" />
  <Map v-if="data.map" />
</template>

<script setup>
  import Map from '@/components/Map';
  import Gallery from '@/components/Gallery';
  import Services from '@/components/Services';
  import Contacts from '@/components/Contacts';
  import Advantages from '@/components/Advantages';

  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
