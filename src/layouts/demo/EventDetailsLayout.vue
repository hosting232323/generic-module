<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="EventDetails" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import EventDetails from '../../views/EventDetails.vue';

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
