<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Shop" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Shop from '../../views/Shop.vue';
</script>
