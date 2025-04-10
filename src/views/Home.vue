<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :id="section.menu ? section.menu.toLowerCase() : null" v-bind="getSectionProps(section)" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useHead } from '@vueuse/head';
  import { useDataStore } from '@/stores/data';
  
  import Map from '@/components/sections/Map';
  import Gallery from '@/components/sections/Gallery';
  import Services from '@/components/sections/Services';
  import Contacts from '@/components/sections/Contacts';
  import Advantages from '@/components/sections/Advantages';
  import DualSection from '@/components/sections/DualSection';
  import Line from '@/components/sections/Line';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    map: Map,
    gallery: Gallery,
    services: Services,
    advantages: Advantages,
    contacts: Contacts,
    dualSection: DualSection,
    line: Line
  };

  const sections = data.value.components;
  const info = data.value.info;

  const getSectionProps = (section) => {
    const props = {
      content: section.content,
      info: info
    };
    
    if (section.title) {
      props.title = section.title;
    }
    
    return props;
  }

  useHead({
    title: 'Home Page',
    meta: [
      { name: 'Fast Site', content: 'This is the home page' }
    ]
  });
</script>
