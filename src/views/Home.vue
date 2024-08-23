<template>
  <div class="grainy-gradient">
    <component 
      v-for="section in sections" 
      :is="componentMap[section.type]" 
      :id="section.menu ? section.menu.toLowerCase() : null" 
      :content="section.content"
      :info="info" 
    />
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useHead } from '@vueuse/head';
  import { useDataStore } from '@/stores/data';

  import Map from '@/components/sections/Map';
  import Line from '@/components/sections/Line';
  import Gallery from '@/components/sections/Gallery';
  import Services from '@/components/sections/Services';
  import Contacts from '@/components/sections/Contacts';
  import Advantages from '@/components/sections/Advantages';
  import DualSection from '@/components/sections/DualSection';

  import OurMap from '@/components/ourSections/Map';
  import OurContacts from '@/components/ourSections/Contacts';
  import SiteViewer from '@/components/ourSections/SiteViewer';
  import OurDualSection from '@/components/ourSections/DualSection';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    map: Map,
    line: Line,
    gallery: Gallery,
    services: Services,
    contacts: Contacts,
    advantages: Advantages,
    dualSection: DualSection,
    ourMap: OurMap,
    ourContacts: OurContacts,
    siteViewer: SiteViewer,
    ourDualSection: OurDualSection
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
