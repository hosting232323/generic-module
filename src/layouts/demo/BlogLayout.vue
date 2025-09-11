<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Blog" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Blog from '../../views/Blog.vue';

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
