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
  map: Map,
  gallery: Gallery,
  services: Services,
  advantages: Advantages,
  contacts: Contacts,
  dualSection: DualSection,
  line: Line,
  siteViewer: SiteViewer
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

<style scoped>
.grainy-gradient {
  background: radial-gradient(ellipse at top left, var(--secondaryColor), transparent 70%),
              radial-gradient(ellipse at bottom right, var(--secondaryColor), transparent 70%),
              linear-gradient(to bottom right, var(--primaryColor), var(--secondaryColor));
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.grainy-gradient::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0,0,0,0.1) 1%, rgba(0,0,0,0) 2%);
  background-size: 3px 3px;
  opacity: 0.3; /* Adjust opacity for the desired effect */
  pointer-events: none;
}

.grainy-gradient::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0,0,0,0.05) 1%, rgba(0,0,0,0) 2%);
  background-size: 3px 3px;
  opacity: 0.3; /* Adjust opacity for the desired effect */
  pointer-events: none;
}
</style>
