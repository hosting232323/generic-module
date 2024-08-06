<template>
    <div ref="scrollContainer" @scroll="handleScroll" class="scroll-container">
      <component 
        v-for="(section, index) in displayedSections" 
        :key="`${section.type}-${index}`"
        :is="componentMap[section.type]" 
        :id="section.menu ? section.menu.toLowerCase() : null" 
        :content="section.content" 
        :info="info" 
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Map from '@/components/sections/Map';
  import Gallery from '@/components/sections/Gallery';
  import Services from '@/components/sections/Services';
  import Contacts from '@/components/sections/Contacts';
  import Advantages from '@/components/sections/Advantages';
  import DualSection from '@/components/sections/DualSection';
  import Line from '@/components/sections/Line';
  import SiteViewer from '@/components/sections/SiteViewer';
  
  const props = defineProps({
    sections: {
      type: Array,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  });
  
  const componentMap = {
    map: Map,
    gallery: Gallery,
    services: Services,
    advantages: Advantages,
    contacts: Contacts,
    dualSection: DualSection,
    line: Line,
    siteViewer: SiteViewer
  };
  
  const displayedSections = ref([...props.sections]);
  const scrollContainer = ref(null);
  
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const addMoreSections = () => {
    const newSections = shuffleArray([...props.sections]);
    displayedSections.value = [...displayedSections.value, ...newSections];
  };
  
  const handleScroll = () => {
    const container = scrollContainer.value;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 200) {
      addMoreSections();
    }
  };
  
  onMounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('scroll', handleScroll);
    }
  });
  
  watch(() => props.sections, (newSections) => {
    displayedSections.value = [...newSections];
  }, { deep: true });
  
  </script>
  
  <style scoped>
  .scroll-container {
    height: 100vh;
    overflow-y: auto;
  }
  </style>