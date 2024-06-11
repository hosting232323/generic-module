<template>
  <router-view />
</template>

<script setup>
  import { useMetaTags } from '@/plugins/useMetaTags';

  useMetaTags();
</script>
