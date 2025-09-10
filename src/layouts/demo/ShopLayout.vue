<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Shop" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Shop from '../../views/Shop.vue';

const hostname = import.meta.env.VITE_HOSTNAME_FASTSITEBACKEND;
const id = -1;
</script>
