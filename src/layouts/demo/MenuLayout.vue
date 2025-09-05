<template>
  <DemoWrapperLayout :hostname="hostname" :id="id" :content="Menu" />
</template>

<script setup>
import DemoWrapperLayout from './DemoWrapperLayout.vue';
import Menu from '../../views/Menu.vue';
</script>
