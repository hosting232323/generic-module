<template>
  <component
    v-for="section in sections"
    :is="componentMap[section.type]"
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

import Map from '@/components/sections/Map';
import Text from '@/components/sections/Text';
import Line from '@/components/sections/Line';
import Reviews from '@/components/sections/Reviews';
import Gallery from '@/components/sections/gallery/Gallery';
import Gallery1 from '@/components/sections/gallery/Gallery1';
import Gallery2 from '@/components/sections/gallery/Gallery2';
import Gallery3 from '@/components/sections/gallery/Gallery3';
import Services from '@/components/sections/Services';
import Contacts from '@/components/sections/Contacts';
import BrandList from '@/components/sections/BrandList';
import Advantages from '@/components/sections/Advantages';
import ShopSummary from '@/components/sections/ShopSummary';
import BlogSummary from '@/components/sections/BlogSummary';
import DualSection from '@/components/sections/DualSection';
import Hero from '@/components/sections/hero/Hero';
import Hero1 from '@/components/sections/hero/Hero1';
import Hero2 from '@/components/sections/hero/Hero2';
import Hero3 from '@/components/sections/hero/Hero3';
import Features from '@/components/sections/features/Features';
import Features1 from '@/components/sections/features/Features1';
import Features2 from '@/components/sections/features/Features2';
import Features3 from '@/components/sections/features/Features3';
import Team from '@/components/sections/team/Team';
import Team1 from '@/components/sections/team/Team1';
import Team2 from '@/components/sections/team/Team2';
import Team3 from '@/components/sections/team/Team3';
import Pricing from '@/components/sections/pricing/Pricing';
import Pricing1 from '@/components/sections/pricing/Pricing1';
import Pricing2 from '@/components/sections/pricing/Pricing2';
import Pricing3 from '@/components/sections/pricing/Pricing3';
import FAQ from '@/components/sections/faq/FAQ';
import FAQ1 from '@/components/sections/faq/FAQ1';
import FAQ2 from '@/components/sections/faq/FAQ2';
import FAQ3 from '@/components/sections/faq/FAQ3';
import Newsletter from '@/components/sections/newsletter/Newsletter';
import Newsletter1 from '@/components/sections/newsletter/Newsletter1';
import Newsletter2 from '@/components/sections/newsletter/Newsletter2';
import Newsletter3 from '@/components/sections/newsletter/Newsletter3';
import Timeline from '@/components/sections/Timeline';
import Timeline1 from '@/components/sections/Timeline1';
import Timeline2 from '@/components/sections/Timeline2';
import Timeline3 from '@/components/sections/Timeline3';
import Stats from '@/components/sections/Stats';
import Stats1 from '@/components/sections/Stats1';
import Stats2 from '@/components/sections/Stats2';
import Stats3 from '@/components/sections/Stats3';
import Portfolio from '@/components/sections/portfolio/Portfolio';
import Portfolio1 from '@/components/sections/portfolio/Portfolio1';
import Portfolio2 from '@/components/sections/portfolio/Portfolio2';
import Portfolio3 from '@/components/sections/portfolio/Portfolio3';
import Testimonials from '@/components/sections/Testimonials';
import Testimonials1 from '@/components/sections/Testimonials1';
import Testimonials2 from '@/components/sections/Testimonials2';
import Testimonials3 from '@/components/sections/Testimonials3';
import CallToAction from '@/components/sections/call-to-action/CallToAction';
import CallToAction1 from '@/components/sections/call-to-action/CallToAction1';
import CallToAction2 from '@/components/sections/call-to-action/CallToAction2';
import CallToAction3 from '@/components/sections/call-to-action/CallToAction3';
import InfoCards from '@/components/sections/InfoCards';
import Parallax from '@/components/sections/Parallax';
import Video from '@/components/sections/video/Video';
import Video1 from '@/components/sections/video/Video1';
import Video2 from '@/components/sections/video/Video2';
import Video3 from '@/components/sections/video/Video3';
import ComparisonTable from '@/components/sections/ComparisonTable';
import Downloads from '@/components/sections/Downloads';
import Process from '@/components/sections/process/Process';
import Process1 from '@/components/sections/process/Process1';
import Process2 from '@/components/sections/process/Process2';
import Process3 from '@/components/sections/process/Process3';
import Partners from '@/components/sections/partners/Partners';
import Partners1 from '@/components/sections/partners/Partners1';
import Partners2 from '@/components/sections/partners/Partners2';
import Partners3 from '@/components/sections/partners/Partners3';
import SocialFeed from '@/components/sections/SocialFeed';
import Certifications from '@/components/sections/Certifications';
import Schedule from '@/components/sections/Schedule';
import Accordion from '@/components/sections/Accordion';
import Directions from '@/components/sections/Directions';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
  map: Map,
  text: Text,
  line: Line,
  reviews: Reviews,
  gallery: Gallery,
  gallery1: Gallery1,
  gallery2: Gallery2,
  gallery3: Gallery3,
  services: Services,
  contacts: Contacts,
  brandlist: BrandList,
  advantages: Advantages,
  shopSummary: ShopSummary,
  shopsummary: ShopSummary,
  blogSummary: BlogSummary,
  blogsummary: BlogSummary,
  dualSection: DualSection,
  hero: Hero,
  hero1: Hero1,
  hero2: Hero2,
  hero3: Hero3,
  features: Features,
  features1: Features1,
  features2: Features2,
  features3: Features3,
  team: Team,
  team1: Team1,
  team2: Team2,
  team3: Team3,
  pricing: Pricing,
  pricing1: Pricing1,
  pricing2: Pricing2,
  pricing3: Pricing3,
  faq: FAQ,
  faq1: FAQ1,
  faq2: FAQ2,
  faq3: FAQ3,
  newsletter: Newsletter,
  newsletter1: Newsletter1,
  newsletter2: Newsletter2,
  newsletter3: Newsletter3,
  timeline: Timeline,
  timeline1: Timeline1,
  timeline2: Timeline2,
  timeline3: Timeline3,
  stats: Stats,
  stats1: Stats1,
  stats2: Stats2,
  stats3: Stats3,
  portfolio: Portfolio,
  portfolio1: Portfolio1,
  portfolio2: Portfolio2,
  portfolio3: Portfolio3,
  testimonials: Testimonials,
  testimonials1: Testimonials1,
  testimonials2: Testimonials2,
  testimonials3: Testimonials3,
  callToAction: CallToAction,
  callToAction1: CallToAction1,
  callToAction2: CallToAction2,
  calltoaction2: CallToAction2,
  callToAction3: CallToAction3,
  infoCards: InfoCards,
  infocards: InfoCards,
  parallax: Parallax,
  video: Video,
  video1: Video1,
  video2: Video2,
  video3: Video3,
  comparisonTable: ComparisonTable,
  downloads: Downloads,
  process: Process,
  process1: Process1,
  process2: Process2,
  process3: Process3,
  partners: Partners,
  partners1: Partners1,
  partners2: Partners2,
  partners3: Partners3,
  socialFeed: SocialFeed,
  certifications: Certifications,
  schedule: Schedule,
  accordion: Accordion,
  directions: Directions
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
