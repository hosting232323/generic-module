<template>
  <component
    v-for="section in sections"
    :is="componentMap[section.type]"
    :id="getText(section.menu) ? getText(section.menu).toLowerCase() : null"
    :content="section.content"
    :info="info"
  />
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
import BrandList from '@/components/sections/BrandList';
import Advantages from '@/components/sections/Advantages';
import DualSection from '@/components/sections/DualSection';

import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: Map,
  line: Line,
  gallery: Gallery,
  services: Services,
  contacts: Contacts,
  brandlist: BrandList,
  advantages: Advantages,
  dualSection: DualSection
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
