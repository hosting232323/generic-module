<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Booking" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Booking from '../../views/Booking.vue';
</script>
