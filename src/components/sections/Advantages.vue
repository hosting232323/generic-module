<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      {{ title || 'I nostri servizi' }}
    </h1>
    <v-card elevation="20" v-for="advantage in content" class="margin_top__default">
      <v-img :src="advantage.image" style="max-height: 600px;" cover />
      <v-card-title style="white-space: normal;">
        {{ advantage.name }}
      </v-card-title>
      <v-card-text v-if="advantage.description">
        <div v-html="advantage.description" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  const { content, info } = defineProps(['content', 'info', 'title']);
</script>
