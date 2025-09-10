<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Booking" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Booking from '../../views/Booking.vue';

const hostname = import.meta.env.VITE_HOSTNAME_FASTSITEBACKEND;
const id = -1;
</script>
