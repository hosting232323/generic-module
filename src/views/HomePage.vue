<template>
  <component
    :is="getComponent(section.type, section.variant)"
    v-for="(section, index) in sections"
    :id="section.type"
    :key="index"
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

import ServicesSectionCustom from '@/components/customs/ServicesSection';


const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: MapViewer,
  text: BaseText,
  line: LineDivider,
  reviews: ReviewsSection,
  gallery: GallerySection,
  services: ServicesSectionCustom,
  contacts: ContactsSection,
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
  title: 'Desamarmi',

  meta: [
    {
      name: 'description',
      content:
        'Desamarmi nasce come realtà specializzata in arte funeraria e lavorazione della pietra a Molfetta (Bari). Realizziamo monumenti funebri, lapidi e soluzioni di design in marmo, quarzo, gres e pietra naturale, unendo tradizione artigiana e tecnologie CNC avanzate.'
    },
    {
      name: 'keywords',
      content:
        'Desamarmi, arte funeraria Puglia, marmo Molfetta, lavorazione pietra Bari, lapidi personalizzate, monumenti funebri, top cucina marmo, quarzo, gres, Neolith, granito, pietra naturale, CNC 5 assi, OMAG Blade, GMM Tecna, design pietra, arredo in pietra, Molfetta showroom, Puglia stone design'
    },
    { name: 'author', content: 'Desamarmi' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#a33a3f' },

    {
      property: 'og:title',
      content: 'Desamarmi | Arte Funeraria e Design in Pietra in Puglia'
    },
    {
      property: 'og:description',
      content:
        'Arte funeraria e lavorazione della pietra a Molfetta (Bari). Soluzioni su misura in marmo, quarzo e gres con tecnologie CNC avanzate.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://desamarmi.it' },
    { property: 'og:image', content: 'https://desamarmi.it/logo.png' },
    { property: 'og:locale', content: 'it_IT' },
    { property: 'og:site_name', content: 'Desamarmi' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Desamarmi | Arte Funeraria e Pietra' },
    {
      name: 'twitter:description',
      content:
        'Arte funeraria e lavorazioni in pietra a Molfetta (Bari) con soluzioni artigianali e tecnologiche.'
    },
    { name: 'twitter:image', content: 'https://desamarmi.it/logo.png' }
  ]
});
</script>
