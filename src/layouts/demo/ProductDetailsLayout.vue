<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="ProductDetails" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import ProductDetails from '../../views/ProductDetails.vue';

const hostname = 'https://fastsite-be.replit.app/';
const id = -1;
</script>
