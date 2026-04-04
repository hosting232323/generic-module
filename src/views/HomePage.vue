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
import { useHead } from '@vueuse/head';
import { useDataStore } from '@/stores/data';
import { ref, computed, onMounted} from 'vue';

import MapViewer from '@/components/sections/MapViewer';
import BaseText from '@/components/sections/BaseText';
import IconText from '@/components/sections/IconText';
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

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: MapViewer,
  text: BaseText,
  line: LineDivider,
  iconText: IconText,
  reviews: ReviewsSection,
  gallery: GallerySection,
  services: ServicesSection,
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


useHead({
  title: 'Macelleria Colasanto Luigi - Carne di Qualità a Molfetta | Consegna a Domicilio e Assistenza Speciale',
  meta: [
    {
      name: 'description',
      content:
        'Macelleria Colasanto Luigi a Molfetta: carne bovina, suina, pollo e formaggi di alta qualità con servizio di consegna a domicilio. Tradizione e gusto dal 1960.',
    },
    {
      name: 'keywords',
      content:
        'macelleria, carne bovina, carne suina, pollo, consegna a domicilio, Molfetta, tradizione, salumi, formaggi, servizio a domicilio, tagli speciali, assistenza culinaria, qualità, artigianato, prodotti freschi',
    },
    { name: 'author', content: 'Macelleria Colasanto Luigi' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#D33F49' },
    { property: 'og:title', content: 'Macelleria Colasanto Luigi - Carne di Qualità a Molfetta | Consegna a Domicilio e Assistenza Speciale' },
    {
      property: 'og:description',
      content:
        'Scopri la qualità della Macelleria Colasanto Luigi a Molfetta. Offriamo carne bovina, suina, pollo e salumi con un servizio eccellente e consegna a domicilio.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://macelleriacolasanto.it' },
    { property: 'og:image', content: 'https://macelleriacolasanto.it/advantages2.jpg' },
    { property: 'og:locale', content: 'it_IT' },
    { property: 'og:site_name', content: 'Macelleria Colasanto Luigi' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Macelleria Colasanto Luigi - Carne di Qualità a Molfetta | Consegna a Domicilio e Assistenza Speciale',
    },
    {
      name: 'twitter:description',
      content:
        'Macelleria Colasanto Luigi: carne fresca e di alta qualità a Molfetta con consegna a domicilio. Scopri il nostro assortimento!',
    },
    { name: 'twitter:image', content: 'https://macelleriacolasanto.it/advantages2.jpg' },
    { name: 'twitter:site', content: '@macelleriacolasanto' },
    { name: 'geo.region', content: 'IT-BA' }, // Codice della regione per Bari, Puglia
    { name: 'geo.placename', content: 'Molfetta' }, // Nome del luogo
    { name: 'geo.position', content: '41.200482;16.598575' }, // Coordinate della posizione
    { name: 'ICBM', content: '41.200482, 16.598575' }, // Obsoleto ma ancora utilizzato da alcuni servizi
    { name: 'business:contact_data:street_address', content: 'Piazza Principe di Napoli, 7' },
    { name: 'business:contact_data:locality', content: 'Molfetta' },
    { name: 'business:contact_data:region', content: 'BA' },
    { name: 'business:contact_data:postal_code', content: '70056' },
    { name: 'business:contact_data:country_name', content: 'Italy' },
    { name: 'business:contact_data:email', content: 'macelleriacolasanto@libero.it' },
    { name: 'business:contact_data:phone_number', content: '+39 080 397 4062' },
    { name: 'business:contact_data:website', content: 'https://macelleriacolasanto.it' }
  ]
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
</script>
