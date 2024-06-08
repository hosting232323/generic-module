<template>
  <Gallery v-if="data.gallery" />
  <Services id="services" v-if="data.services" />
  <Brandlist id="brandlist" />
  <v-container v-if="data.contacts">
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Advantages id="advantages" v-if="data.advantages" />
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
  import Advantages from '@/components/Advantages';

  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
