<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :id="section.menu ? section.menu.toLowerCase() : null" :content="section.content" :info="info" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useHead } from '@vueuse/head';
  import { useDataStore } from '@/stores/data';
  
  import Map from '@/components/Map';
  import Gallery from '@/components/Gallery';
  import Services from '@/components/Services';
  import Contacts from '@/components/Contacts';
  import Advantages from '@/components/Advantages';
  import DualSection from '@/components/DualSection';
  import Line from '@/components/Line';
  import SiteViewer from '@/components/SiteViewer';

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
