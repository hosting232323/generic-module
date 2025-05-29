<template>
  <a href="" class="social">
    <v-icon icon="mdi-instagram" :color="info.primaryColor" />
  </a>
  <!-- <v-container>
    <hr :style="{ height: '5px', backgroundColor: info.primaryColor }" />
  </v-container> -->
</template>

<script setup>
const { content, info } = defineProps(['content', 'info']);
console.log(content);
</script>

<style scoped>
.social {
  background-color: red;
  width: 50px;
  height: 50px;
}
</style>