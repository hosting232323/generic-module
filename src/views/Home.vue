<template>
  <component
    v-for="section in sections"
    :is="componentMap[section.type]"
    :id="getAncor(section.menu) ? getAncor(section.menu).toLowerCase() : null"
    :content="section.content"
    :info="info"
  />
</template>

<script setup>
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useLanguageStore } from '@/stores/language';

import Map from '@/components/sections/Map';
import Blog from '@/components/sections/Blog';
import Text from '@/components/sections/Text';
import Line from '@/components/sections/Line';
import Reviews from '@/components/sections/Reviews';
import Gallery from '@/components/sections/Gallery';
import Services from '@/components/sections/Services';
import Contacts from '@/components/sections/Contacts';
import BrandList from '@/components/sections/BrandList';
import Advantages from '@/components/sections/Advantages';
import DualSection from '@/components/sections/DualSection';

const { getAncor } = useLanguageStore();
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: Map,
  blog: Blog,
  text: Text,
  line: Line,
  reviews: Reviews,
  gallery: Gallery,
  services: Services,
  contacts: Contacts,
  brandlist: BrandList,
  advantages: Advantages,
  dualSection: DualSection
};

const addOn = data.value.addOn;
const info = data.value.info;

const sections = computed(() => {
  return data.value.components.filter(section => {
    if (section.type === 'blog') {
      return addOn?.some(a => a.toLowerCase() === 'blog');
    }
    return true;
  });
});

useHead({
  title: 'Home Page',
  meta: [
    { name: 'Carpediem', content: 'This is the home page' }
  ]
});
</script>
