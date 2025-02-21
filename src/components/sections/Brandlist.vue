<template>
  <v-container>
    <v-slide-group>
      <v-slide-group-item v-for="brand in brands">
        <v-card :height="isMobile ? 150 : 300" :width="isMobile ? 150 : 300" class="brand_item" >
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
    '/brand/Guess.jpg',
    '/brand/Save the Duck.jpg',
    '/brand/Guess Jeans.jpg',
    '/brand/Deha.jpg',
    '/brand/Guess Original.jpg',
    '/brand/Ganesh Camiceria.jpg',
    '/brand/Freaky Nation.jpeg'
  ];
</script>

<style scoped>
  .brand_item {
    margin-right: 25px;
    border: 0px
  }
</style>
