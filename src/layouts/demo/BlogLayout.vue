<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Blog" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Blog from '../../views/Blog.vue';

const hostname = import.meta.env.VITE_HOSTNAME_FASTSITEBACKEND;
const id = -1;
</script>
