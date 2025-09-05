<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Blog" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Blog from '../../views/Blog.vue';
</script>
