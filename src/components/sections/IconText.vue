<template>
  <v-container>
    <br><h1 :style="{ color: info.primaryColor }">
      <v-row>
        <v-col cols="12" md="4">
          <v-icon icon="mdi-food-steak" :color="info.primaryColor" style="float: left;" />
          <p class="contact__text">&nbsp;&nbsp;Macelleria</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-icon icon="mdi-food-drumstick-outline" :color="info.primaryColor" style="float: left;" />
          <p class="contact__text">&nbsp;&nbsp;Salumeria</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-icon icon="mdi-egg-outline" :color="info.primaryColor" style="float: left;" />
          <p class="contact__text">&nbsp;&nbsp;Polleria</p>
        </v-col>
      </v-row>
    </h1>
  </v-container>
</template>

<script setup>
  const { content, info } = defineProps(['content', 'info']);
</script>
