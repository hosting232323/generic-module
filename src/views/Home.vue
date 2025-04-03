<template>
  <component v-for="component in components" :is="componentMap[component.type]" :id="component.menu ? component.menu.toLowerCase() : null" :content="component.content" :info="info" :title="component.title"/>
</template>

<script setup>
  import { useHead } from '@vueuse/head';
  import { computed } from 'vue';
  
  import Map from '@/components/sections/Map';
  import Gallery from '@/components/sections/Gallery';
  import Services from '@/components/sections/Services';
  import Contacts from '@/components/sections/Contacts';
  import Advantages from '@/components/sections/Advantages';
  import DualSection from '@/components/sections/DualSection';
  import Line from '@/components/sections/Line';

  const props = defineProps({
    info: {
      type: Object,
      required: true
    },
    addOn: {
      type: Array,
      default: () => []
    },
    components: {
      type: Object,
      required: true
    }
  });

  const info = computed(() => props.info);
  const components = computed(() => props.components);

  const componentMap = {
    map: Map,
    gallery: Gallery,
    services: Services,
    advantages: Advantages,
    contacts: Contacts,
    dualSection: DualSection,
    line: Line
  };

  useHead({
    title: 'Home Page',
    meta: [
      { name: 'Fast Site', content: 'This is the home page' }
    ]
  });
</script>
