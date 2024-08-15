<template>
  <div>
    <SiteRow v-for="site in sites" :key="site.name + Math.random()" :site="site" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import SiteRow from '@/components/sections/SiteRow';

  const originalSites = [
    {
      name: 'Gatti 1',
      images: [
        '/gatti1/1.jpg',
        '/gatti1/2.jpg',
        '/gatti1/3.jpg'
      ]
    },
    {
      name: 'Gatti 2',
      images: [
        '/gatti2/1.jpg',
        '/gatti2/2.jpg',
        '/gatti2/3.jpg'
      ]
    },
    {
      name: 'Gatti 1',
      images: [
        '/gatti1/1.jpg',
        '/gatti1/2.jpg',
        '/gatti1/3.jpg'
      ]
    },
    {
      name: 'Gatti 2',
      images: [
        '/gatti2/1.jpg',
        '/gatti2/2.jpg',
        '/gatti2/3.jpg'
      ]
    },
    {
      name: 'Gatti 1',
      images: [
        '/gatti1/1.jpg',
        '/gatti1/2.jpg',
        '/gatti1/3.jpg'
      ]
    },
    {
      name: 'Gatti 2',
      images: [
        '/gatti2/1.jpg',
        '/gatti2/2.jpg',
        '/gatti2/3.jpg'
      ]
    }
  ];

  const sites = ref([...originalSites]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function appendNewSites() {
    const newSites = shuffle([...originalSites]);
    sites.value = [...sites.value, ...newSites];
  }

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      appendNewSites();
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
</script>
