<template>
  <v-container>
    <v-slide-group>
      <v-slide-group-item v-for="brand in brands">
        <v-card :height="isMobile ? 150 : 300" :width="isMobile ? 150 : 300" class="brand_item">
          <v-img :src="brand" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup>
  import mobile from '@/utils/mobile';

  const isMobile = mobile.setupMobileUtils();

  const brands = [
    '/Guess.jpg',
    '/Save the Duck.jpg',
    '/Guess Jeans.jpg',
    '/Deha.jpg',
    '/Guess Original.jpg',
    '/Ganesh Camiceria.jpg',
    '/Freaky Nation.jpeg'
  ];
</script>

<style scoped>
  .brand_item {
    margin-right: 25px;
    border: 0px
  }
</style>
