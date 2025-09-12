<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Menu" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Menu from '../../views/Menu.vue';

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
