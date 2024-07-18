<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :id="section.menu ? section.menu.toLowerCase() : null" :content="section.content" :info="info" />
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
  import SiteViewer from '@/components/sections/SiteViewer';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    'map': Map,
    'gallery': Gallery,
    'services': Services,
    'advantages': Advantages,
    'contacts': Contacts,
    'dualSection': DualSection,
    'line': Line,
    'siteViewer': SiteViewer
  };

  const sections = data.value.components;
  const info = data.value.info;

  useHead({
    title: 'Home Page',
    meta: [
      { name: 'Fast Site', content: 'This is the home page' }
    ]
  });
</script>
