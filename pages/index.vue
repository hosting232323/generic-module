<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :id="section.menu ? section.menu.toLowerCase() : null" :content="section.content" :info="info" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  
  import Map from '@/components/sectionsMap';
  import Gallery from '@/components/sectionsGallery';
  import Services from '@/components/sectionsServices';
  import Contacts from '@/components/sectionsContacts';
  import Advantages from '@/components/sectionsAdvantages';
  import DualSection from '@/components/sectionsDualSection';
  import Line from '@/components/sectionsLine';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    'map': Map,
    'gallery': Gallery,
    'services': Services,
    'advantages': Advantages,
    'contacts': Contacts,
    'dualSection': DualSection,
    'line': Line
  };

  const sections = data.value.components;
  const info = data.value.info;
</script>
