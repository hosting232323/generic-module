<template>
    <br><hr :style="{ height: '5px', backgroundColor: info.primaryColor }" /><br>
</template>

<script setup>
  const { info } = defineProps(['info']);
</script>
