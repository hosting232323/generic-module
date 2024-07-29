<template>
  <Gallery v-if="data.gallery" />
  <Services id="whoweare" v-slide-in />
  <v-container v-if="data.contacts" v-slide-in>
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Brandlist id="brandlist" v-slide-in />
  <v-container v-if="data.contacts" v-slide-in>
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <DualSection1 id="advantages" v-slide-in />
  <DualSection2 v-if="isMobile" v-slide-in />
  <DualSection4 v-else v-slide-in />
  <DualSection3 v-slide-in />
  <v-container v-if="data.contacts" v-slide-in>
    <hr :style="{ backgroundColor: data.primaryColor, height: '5px' }" />
  </v-container>
  <Contacts id="contacts" v-if="data.contacts" v-slide-in />
</template>

<script setup>
  import Gallery from '@/components/Gallery';
  import Services from '@/components/Services';
  import Contacts from '@/components/Contacts';
  import Brandlist from '@/components/Brandlist';
  import DualSection1 from '@/components/DualSection1';
  import DualSection2 from '@/components/DualSection2';
  import DualSection3 from '@/components/DualSection3';
  import DualSection4 from '@/components/DualSection4';

  import mobile from '@/utils/mobile';
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const isMobile = mobile.setupMobileUtils();

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>
