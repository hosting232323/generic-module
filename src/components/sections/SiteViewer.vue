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
      name: 'Colasanto Luigi',
      link: 'https://colasantoluigi.it',
      images: [
        '/colasantoluigi/1.png',
        '/colasantoluigi/2.png',
        '/colasantoluigi/3.png'
      ]
    },
    {
      name: 'Il Forno',
      link: 'https://ilfornomolfetta.it',
      logo: 'https://ilfornomolfetta.it/logo.png',
      images: [
        '/ilfornomolfetta/1.png',
        '/ilfornomolfetta/2.png',
        '/ilfornomolfetta/3.png'
      ]
    },
    {
      name: 'Mulino Bianco - La Via del Gusto',
      link: 'https://panificio-mulinobianco.it',
      images: [
        '/panificio-mulinobianco/1.png',
        '/panificio-mulinobianco/2.png',
        '/panificio-mulinobianco/3.png'
      ]
    },
    {
      name: 'La Dimora dell\'Angelo',
      link: 'https://ladimoradellangelo.it',
      images: [
        '/ladimoradellangelo/1.png',
        '/ladimoradellangelo/2.png',
        '/ladimoradellangelo/3.png'
      ]
    },
    {
      name: 'Di Carne Showroom',
      link: 'https://dicarneshowroom.it',
      images: [
        '/dicarneshowroom/1.png',
        '/dicarneshowroom/2.png',
        '/dicarneshowroom/3.png'
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
