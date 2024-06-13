<template>
  <router-view />
</template>

<script setup>
  import { useMetaTags } from '@/plugins/metaTags';

  useMetaTags();
</script>
