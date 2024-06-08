<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :content="section.content" :info="info" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  
  import Map from '@/components/Map';
  import Gallery from '@/components/Gallery';
  import Services from '@/components/Services';
  import Contacts from '@/components/Contacts';
  import Advantages from '@/components/Advantages';
  import DualSection from '@/components/DualSection';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    'map': Map,
    'gallery': Gallery,
    'services': Services,
    'advantages': Advantages,
    'contacts': Contacts,
    'dualSection': DualSection
  };

  const sections = data.value.components;
  const info = data.value.info;
</script>
