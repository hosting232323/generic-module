<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Home" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Home from '../../views/Home.vue';

const hostname = import.meta.env.VITE_HOSTNAME_FASTSITEBACKEND;
const id = -1;
</script>
