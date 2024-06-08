<template>
  <component
    :is="getComponent(section.type, section.variant)"
    v-for="(section, index) in sections"
    :id="section.type"
    :key="index"
    v-slide-in
    :content="section.content"
    :info="info"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';
import { useDataStore } from '@/stores/data';
import { ref, computed, onMounted} from 'vue';

import MapViewer from '@/components/sections/MapViewer';
import BaseText from '@/components/sections/BaseText';
import LineDivider from '@/components/sections/LineDivider';
import ReviewsSection from '@/components/sections/ReviewsSection';
import GallerySection from '@/components/sections/GallerySection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactsSection from '@/components/sections/ContactsSection';
import BrandList from '@/components/sections/BrandList';
import ShopSummary from '@/components/sections/ShopSummary';
import BlogSummary from '@/components/sections/BlogSummary';
import DualSection from '@/components/sections/DualSection';

import AdvantagesDefault from '@/components/sections/advantages/AdvantagesDefault';
import AdvantagesBusiness from '@/components/sections/advantages/AdvantagesBusiness';
import AdvantagesCreative from '@/components/sections/advantages/AdvantagesCreative';
import AdvantagesEcommerce from '@/components/sections/advantages/AdvantagesEcommerce';

import WhoWeAreCustom from '@/components/customs/WhoWeAre';
import MapViewerCustom from '@/components/customs/MapViewer';
import BrandListCustom from '@/components/customs/BrandList';
import DualSectionCustom from '@/components/customs/DualSection';
import GallerySectionCustom from '@/components/customs/GallerySection';
import ServicesSectionCustom from '@/components/customs/ServicesSection';
import ContactsSectionCustom from '@/components/customs/ContactsSection';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: MapViewerCustom,
  text: BaseText,
  line: LineDivider,
  whoWeAre: WhoWeAreCustom,
  reviews: ReviewsSection,
  gallery: GallerySectionCustom,
  services: ServicesSectionCustom,
  contacts: ContactsSectionCustom,
  brandlist: BrandListCustom,
  advantages: {
    default: AdvantagesDefault,
    business: AdvantagesBusiness,
    creative: AdvantagesCreative,
    ecommerce: AdvantagesEcommerce
  },
  shopSummary: ShopSummary,
  blogSummary: BlogSummary,
  dualSection: DualSectionCustom
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

const preloadedSections = ref([]);

const extractImages = (obj) => {
  let urls = [];
  if (!obj) return urls;

  if (typeof obj === 'string' && /\.(jpe?g|png|webp)$/i.test(obj)) {
    urls.push(obj);
  } else if (Array.isArray(obj)) {
    obj.forEach(item => urls.push(...extractImages(item)));
  } else if (typeof obj === 'object') {
    Object.values(obj).forEach(val => urls.push(...extractImages(val)));
  }
  return urls;
};

const preloadImages = (sectionsToPreload) => {
  const allImages = sectionsToPreload.flatMap(section => extractImages(section.content));
  allImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

const preloadAboveFold = (sectionsList) => {
  preloadImages(sectionsList);
  preloadedSections.value = sectionsList.map(s => s.type);
};

const lazyLoadImages = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const section = data.value.components.find(s => s.type === sectionId);
        if (section && !preloadedSections.value.includes(sectionId)) {
          preloadImages([section]);
          preloadedSections.value.push(sectionId);
        }
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('[id]').forEach(el => observer.observe(el));
};

onMounted(() => {
  if (data.value?.components) {
    preloadAboveFold(data.value.components);
    lazyLoadImages();
  }
});

useHead({
  title: 'Di Carne Show Room',

  meta: [
    {
      name: 'description',
      content:
        'Di Carne Show Room è un punto di riferimento per la moda a Casamassima (Bari). Selezioniamo brand come Save the Duck, Trussardi, Seventy, Deha e altri marchi internazionali.'
    },
    {
      name: 'keywords',
      content:
        'Di Carne Show Room, moda Puglia, showroom abbigliamento, Casamassima moda, Bari showroom, Save the Duck, Trussardi, Seventy 1970, Deha, Mauna Kea, fashion showroom, abbigliamento uomo donna'
    },
    { name: 'author', content: 'Di Carne Show Room' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#2b4982' },

    { property: 'og:title', content: 'Di Carne Show Room | Moda e Brand Selezionati in Puglia' },
    {
      property: 'og:description',
      content:
        'Showroom moda a Casamassima (Bari) con brand internazionali selezionati.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://dicarneshowroom.it' },
    { property: 'og:image', content: 'https://dicarneshowroom.it/logo.png' },
    { property: 'og:locale', content: 'it_IT' },
    { property: 'og:site_name', content: 'Di Carne Show Room' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Di Carne Show Room' },
    {
      name: 'twitter:description',
      content: 'Showroom moda a Casamassima (Bari) con brand selezionati.'
    },
    { name: 'twitter:image', content: 'https://dicarneshowroom.it/logo.png' }
  ]
});
</script>
