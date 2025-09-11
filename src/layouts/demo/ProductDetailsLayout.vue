<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="ProductDetails" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import ProductDetails from '../../views/ProductDetails.vue';

defineProps({
  hostname: {
    type: String,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  }
})
</script>
