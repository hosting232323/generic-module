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
  title: "Il Forno - Buffet per Ogni Occasione a Molfetta | Menù per Tutti i Gusti",
  meta: [
    {
      name: "description",
      content:
        "Il Forno a Molfetta offre buffet su misura per tutte le occasioni: compleanni, eventi e feste. Scopri i nostri menù per 10, 15, 20, 25, e 30 persone e il menù bambini.",
    },
    {
      name: "keywords",
      content:
        "buffet, catering, feste, eventi, Molfetta, panini, cornetti, focacce, panzerottini, tramezzini, rustici, menù per bambini, prenotazioni, ingredienti freschi",
    },
    { name: "author", content: "Il Forno" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#B76E79" },
    { property: "og:title", content: "Il Forno - Buffet per Ogni Occasione a Molfetta | Menù per Tutti i Gusti" },
    {
      property: "og:description",
      content:
        "Il Forno offre buffet personalizzati per feste ed eventi a Molfetta. Scopri i nostri menù su misura, da 10 a 30 persone, e il menù bambini.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://ilfornomolfetta.it" },
    { property: "og:image", content: "https://ilfornomolfetta.it/advantage1.jpeg" },
    { property: "og:locale", content: "it_IT" },
    { property: "og:site_name", content: "Il Forno" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Il Forno - Buffet per Ogni Occasione a Molfetta | Menù per Tutti i Gusti",
    },
    {
      name: "twitter:description",
      content:
        "Scopri Il Forno a Molfetta: buffet personalizzati per eventi, feste e ricorrenze con menù su misura da 10 a 30 persone e per bambini.",
    },
    { name: "twitter:image", content: "https://ilfornomolfetta.it/advantage1.jpeg" },
    { name: "twitter:site", content: "@ilfornomolfetta" },
    { name: "geo.region", content: "IT-BA" }, // Codice della regione per Bari, Puglia
    { name: "geo.placename", content: "Molfetta" }, // Nome del luogo
    { name: "geo.position", content: "41.190984;16.585143" }, // Coordinate della posizione
    { name: "ICBM", content: "41.190984, 16.585143" }, // Obsoleto ma ancora utilizzato da alcuni servizi
    { name: "business:contact_data:street_address", content: "Via Freemantle, 42" },
    { name: "business:contact_data:locality", content: "Molfetta" },
    { name: "business:contact_data:region", content: "BA" },
    { name: "business:contact_data:postal_code", content: "70056" },
    { name: "business:contact_data:country_name", content: "Italy" },
    { name: "business:contact_data:email", content: "ilfornomolfetta@gmail.com" },
    { name: "business:contact_data:phone_number", content: "+39 080 338 1987" },
    { name: "business:contact_data:website", content: "https://ilfornomolfetta.it" }
  ]
});

</script>
