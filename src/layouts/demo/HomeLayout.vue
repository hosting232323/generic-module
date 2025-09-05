<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Home" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Home from '../../views/Home.vue';
</script>
