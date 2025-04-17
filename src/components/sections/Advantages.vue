<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      {{ pageTitle || 'I nostri vantaggi' }}
    </h1>
    <v-card elevation="20" v-for="advantage in filteredContent" class="margin_top__default">
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
const { content, info } = defineProps(['content', 'info']);

const pageTitle = content.find(item => item.title)?.title ?? null;
const filteredContent = content.filter(item => !item.title);
</script>
