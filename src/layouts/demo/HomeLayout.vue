<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Home" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Home from '../../views/Home.vue';

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