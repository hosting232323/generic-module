<template>
  <v-carousel :height="mobile.setupMobileUtils().value ? 400 : 600" delimiter-icon="mdi-square">
    <v-carousel-item v-for="slide in ciao">
      <v-img :src="slide" cover />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  import mobile from '@/utils/mobile';

  const { ciao } = defineProps(['ciao']);
</script>
