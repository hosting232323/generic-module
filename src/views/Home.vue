<template>
  <div class="grainy-gradient">
    <SiteForm />
    <component 
      v-for="section in sections" 
      :is="componentMap[section.type]" 
      :id="section.menu ? section.menu.toLowerCase() : null" 
      :content="section.content"
      :info="info" 
    />
  </div>
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
  import Advantages from '@/components/sections/Advantages';
  import DualSection from '@/components/sections/DualSection';

  import OurMap from '@/components/ourSections/Map';
  import SiteForm from '../components/ourSections/SiteForm';
  import OurContacts from '@/components/ourSections/Contacts';
  import SiteViewer from '@/components/ourSections/SiteViewer';
  import OurDualSection from '@/components/ourSections/DualSection';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    map: Map,
    line: Line,
    gallery: Gallery,
    services: Services,
    contacts: Contacts,
    advantages: Advantages,
    dualSection: DualSection,
    ourMap: OurMap,
    ourContacts: OurContacts,
    siteViewer: SiteViewer,
    ourDualSection: OurDualSection
  };

  const sections = data.value.components;
  const info = data.value.info;

  useHead({
  title: "FastSite - Soluzioni Digitali Complete per il Tuo Business | Digitalizzazione e Innovazione",
  meta: [
    {
      name: "description",
      content:
        "FastSite offre soluzioni digitali avanzate per aziende di tutta Italia: siti web professionali, chatbot AI, tour virtuali, SEO, e digitalizzazione completa. Trasforma il tuo business con noi.",
    },
    {
      name: "keywords",
      content:
        "soluzioni digitali, digitalizzazione, siti web, chatbot AI, tour virtuali, marketing digitale, SEO, innovazione tecnologica, consulenza digitale, sviluppo web, automazione aziendale, software personalizzato, assistente virtuale, gestione clienti, Google Ads, ottimizzazione digitale, Bari, Puglia, Italia",
    },
    { name: "author", content: "FastSite" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#f34455" },
    { property: "og:title", content: "FastSite - Soluzioni Digitali Complete per il Tuo Business | Digitalizzazione e Innovazione" },
    {
      property: "og:description",
      content:
        "Scopri FastSite: soluzioni digitali per la tua azienda in tutta Italia, dai siti web ai chatbot e tour virtuali. Ottimizza la tua presenza online con i nostri servizi innovativi.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://fastsite.it" },
    { property: "og:image", content: "https://fastsite.it/logo.png" },
    { property: "og:locale", content: "it_IT" },
    { property: "og:site_name", content: "FastSite" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "FastSite - Soluzioni Digitali Complete per il Tuo Business | Digitalizzazione e Innovazione",
    },
    {
      name: "twitter:description",
      content:
        "FastSite: leader in soluzioni digitali per aziende in Italia. Offriamo servizi di sviluppo web, chatbot AI, tour virtuali e molto altro per la digitalizzazione del tuo business.",
    },
    { name: "twitter:image", content: "https://fastsite.it/logo.png" },
    { name: "twitter:site", content: "@fastsite" },
    { name: "geo.region", content: "IT-BA" }, // Codice della regione per Bari, Puglia
    { name: "geo.placename", content: "Bari" }, // Nome del luogo
    { name: "geo.position", content: "41.117143;16.871871" }, // Coordinate della posizione per Bari
    { name: "ICBM", content: "41.117143, 16.871871" }, // Obsoleto ma ancora utilizzato da alcuni servizi
    { name: "business:contact_data:street_address", content: "Via Esempio, 10" }, // Indirizzo fittizio, sostituire con quello corretto
    { name: "business:contact_data:locality", content: "Bari" },
    { name: "business:contact_data:region", content: "BA" },
    { name: "business:contact_data:postal_code", content: "70121" }, // Codice postale di Bari
    { name: "business:contact_data:country_name", content: "Italy" },
    { name: "business:contact_data:email", content: "giovanni.colasanto@fastsite.it" },
    { name: "business:contact_data:phone_number", content: "+39 347 876 8340" },
    { name: "business:contact_data:website", content: "https://fastsite.it" }
  ]
});

</script>
