<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :id="section.menu ? section.menu.toLowerCase() : null" :content="section.content" :info="info" />
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

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    map: Map,
    gallery: Gallery,
    services: Services,
    advantages: Advantages,
    contacts: Contacts,
    dualSection: DualSection,
    line: Line
  };

  const sections = data.value.components;
  const info = data.value.info;

  useHead({
    title: 'Panificio Mulino Bianco - La Via del Gusto | Molfetta, Puglia',
    meta: [
      { name: 'description', content: 'Scopri Panificio Mulino Bianco a Molfetta, Puglia. Prodotti da forno artigianali, pasticceria creativa, e deliziosi panzerotti. Il nostro panificio offre pane fresco, dolci, taralli, e molto altro.' },
      { name: 'keywords', content: 'panificio, panetteria, prodotti da forno, pasticceria, pane fresco, dolci, taralli, panzerotti, cibo, Molfetta, Puglia, Mulino Bianco, panetteria artigianale, forno' },
      { name: 'author', content: 'Panificio Mulino Bianco' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#893168' },
      { property: 'og:title', content: 'Panificio Mulino Bianco - La Via del Gusto | Molfetta, Puglia' },
      { property: 'og:description', content: 'Scopri Panificio Mulino Bianco a Molfetta, Puglia. Prodotti da forno artigianali, pasticceria creativa, e deliziosi panzerotti. Il nostro panificio offre pane fresco, dolci, taralli, e molto altro.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://panificio-mulinobianco.it' },
      { property: 'og:image', content: 'https://panificio-mulinobianco.it/gallery1.jpeg' },
      { property: 'og:locale', content: 'it_IT' },
      { property: 'og:site_name', content: 'Panificio Mulino Bianco - La Via del Gusto' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Panificio Mulino Bianco - La Via del Gusto | Molfetta, Puglia' },
      { name: 'twitter:description', content: 'Scopri Panificio Mulino Bianco a Molfetta, Puglia. Prodotti da forno artigianali, pasticceria creativa, e deliziosi panzerotti. Il nostro panificio offre pane fresco, dolci, taralli, e molto altro.' },
      { name: 'twitter:image', content: 'https://panificio-mulinobianco.it/gallery1.jpeg' },
      { name: 'twitter:site', content: '@panificiomulinobianco' },
      { name: 'geo.region', content: 'IT-BA' }, // Geo region code for Bari, Puglia
      { name: 'geo.placename', content: 'Molfetta' }, // Placename
      { name: 'geo.position', content: '41.199094;16.599416' }, // Coordinates of the location
      { name: 'ICBM', content: '41.199094, 16.599416' } // Deprecated but still used by some services
    ]
  });
</script>
