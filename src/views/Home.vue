<template>
  <component
    v-for="section in sections"
    :is="getComponent(section.type, section.variant)"
    :id="section.type"
    :content="section.content"
    :info="info"
  />
</template>

<script setup>
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

import Map from '@/components/sections/Map.vue';
import Text from '@/components/sections/Text.vue';
import Line from '@/components/sections/Line.vue';
import Reviews from '@/components/sections/Reviews.vue';
import Gallery from '@/components/sections/Gallery.vue';
import Services from '@/components/sections/Services.vue';
import Contacts from '@/components/sections/Contacts.vue';
import BrandList from '@/components/sections/BrandList.vue';
import ShopSummary from '@/components/sections/ShopSummary.vue';
import BlogSummary from '@/components/sections/BlogSummary.vue';
import DualSection from '@/components/sections/DualSection.vue';

import AdvantagesDefault from '@/components/sections/advantages/AdvantagesDefault.vue';
import AdvantagesBusiness from '@/components/sections/advantages/AdvantagesBusiness.vue';
import AdvantagesCreative from '@/components/sections/advantages/AdvantagesCreative.vue';
import AdvantagesEcommerce from '@/components/sections/advantages/AdvantagesEcommerce.vue';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: Map,
  text: Text,
  line: Line,
  reviews: Reviews,
  gallery: Gallery,
  services: Services,
  contacts: Contacts,
  brandlist: BrandList,
  advantages: {
    default: AdvantagesDefault,
    business: AdvantagesBusiness,
    creative: AdvantagesCreative,
    ecommerce: AdvantagesEcommerce
  },
  shopSummary: ShopSummary,
  blogSummary: BlogSummary,
  dualSection: DualSection
};

const getComponent = (type, variant) => {
  if (variant && componentMap[type]?.[variant])
    return componentMap[type][variant];
  
  if (componentMap[type]?.default)
    return componentMap[type].default;
  
  return componentMap[type];
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
