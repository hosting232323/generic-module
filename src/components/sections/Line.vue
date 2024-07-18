<template>
  <v-container>
    <hr :style="{ height: '5px', backgroundColor: info.primaryColor }" />
  </v-container>
</template>

<script setup>
  const { info } = defineProps(['info']);
</script>
