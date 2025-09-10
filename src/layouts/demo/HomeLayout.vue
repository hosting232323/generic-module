<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Home" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Home from '../../views/Home.vue';

const hostname = 'https://fastsite-be.replit.app/';
const id = -1;
</script>
