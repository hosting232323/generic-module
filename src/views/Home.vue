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
  import WhoAmI from '@/components/sections/WhoAmI';

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
    whoAmI: WhoAmI
  };

  const sections = data.value.components;
  const info = data.value.info;

  useHead({
  title: "La Dimora dell'Angelo - Ospitalità nel Cuore di Molfetta, Puglia",
  meta: [
    {
      name: "description",
      content:
        "Scopri La Dimora dell'Angelo, una struttura elegante e accogliente a Molfetta, Puglia. Offriamo camere spaziose, WiFi gratuito, e una posizione ideale per esplorare la bellezza locale.",
    },
    {
      name: "keywords",
      content:
        "bed and breakfast, ospitalità, alloggio, camere, Molfetta, Puglia, WiFi gratuito, camere familiari, aria condizionata, parcheggio, struttura rinnovata, vacanza in Puglia, soggiorno Molfetta",
    },
    { name: "author", content: "La Dimora dell'Angelo" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#072A1B" },
    { property: "og:title", content: "La Dimora dell'Angelo - Ospitalità nel Cuore di Molfetta, Puglia" },
    {
      property: "og:description",
      content:
        "Scopri La Dimora dell'Angelo, una struttura elegante e accogliente a Molfetta, Puglia. Offriamo camere spaziose, WiFi gratuito, e una posizione ideale per esplorare la bellezza locale.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://ladimoradellangelo.it" },
    { property: "og:image", content: "https://ladimoradellangelo.it/gallery1.jpg" },
    { property: "og:locale", content: "it_IT" },
    { property: "og:site_name", content: "La Dimora dell'Angelo" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "La Dimora dell'Angelo - Ospitalità nel Cuore di Molfetta, Puglia",
    },
    {
      name: "twitter:description",
      content:
        "Scopri La Dimora dell'Angelo, una struttura elegante e accogliente a Molfetta, Puglia. Offriamo camere spaziose, WiFi gratuito, e una posizione ideale per esplorare la bellezza locale.",
    },
    { name: "twitter:image", content: "https://ladimoradellangelo.it/gallery1.jpg" },
    { name: "twitter:site", content: "@ladimoradellangelo" },
    { name: "geo.region", content: "IT-BA" }, // Codice della regione per Bari, Puglia
    { name: "geo.placename", content: "Molfetta" }, // Nome del luogo
    { name: "geo.position", content: "41.199464;16.599849" }, // Coordinate della posizione
    { name: "ICBM", content: "41.199464, 16.599849" } // Obsoleto ma ancora utilizzato da alcuni servizi
  ]
});

</script>
