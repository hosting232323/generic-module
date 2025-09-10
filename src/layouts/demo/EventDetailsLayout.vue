<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="EventDetails" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import EventDetails from '../../views/EventDetails.vue';

const hostname = import.meta.env.VITE_HOSTNAME_FASTSITEBACKEND;
const id = -1;
</script>
