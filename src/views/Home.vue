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

import Map from '@/components/sections/Map/MapDefault';
import Text from '@/components/sections/Text/TextDefault';
import Line from '@/components/sections/Line/LineDefault';
import Reviews from '@/components/sections/Reviews/ReviewsDefault';
import Gallery from '@/components/sections/Gallery/GalleryDefault';
import Services from '@/components/sections/Services/ServicesDefault';
import Contacts from '@/components/sections/Contacts/ContactsDefault';
import BrandList from '@/components/sections/BrandList/BrandListDefault';
import Advantages from '@/components/sections/Advantages/AdvantagesDefault';
import ShopSummary from '@/components/sections/ShopSummary/ShopSummaryDefault';
import BlogSummary from '@/components/sections/BlogSummary/BlogSummaryDefault';
import DualSection from '@/components/sections/DualSection/DualSectionDefault';

import AdvantagesDefault from '@/components/sections/Advantages/AdvantagesDefault';
import AdvantagesBusiness from '@/components/sections/Advantages/AdvantagesBusiness';
import AdvantagesCreative from '@/components/sections/Advantages/AdvantagesCreative';
import AdvantagesEcommerce from '@/components/sections/Advantages/AdvantagesEcommerce';

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
  advantages: Advantages,
  shopSummary: ShopSummary,
  blogSummary: BlogSummary,
  dualSection: DualSection
};

const variantsMap = {
  advantages: {
    default: AdvantagesDefault,
    business: AdvantagesBusiness,
    creative: AdvantagesCreative,
    ecommerce: AdvantagesEcommerce
  }
};

const getComponent = (type, variant) => {
  if (variant && variantsMap[type]?.[variant]) {
    return variantsMap[type][variant];
  }
  
  if (variant && variantsMap[type]?.default) {
    return variantsMap[type].default;
  }
  
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
  title: 'FastSite',
  meta: [
    { name: 'FastSite', content: 'This is the home page' }
  ]
});
</script>
