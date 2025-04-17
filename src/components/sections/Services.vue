<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      {{ pageTitle || 'I nostri servizi' }}
    </h1>
    <v-expansion-panels multiple>
      <v-expansion-panel elevation="20" v-for="service in filteredContent" class="margin_top__default">
        <v-expansion-panel-title>
          <b>{{ service.name }}</b>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-html="service.description" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
const { content, info } = defineProps(['content', 'info']);

const pageTitle = content.find(item => item.title)?.title ?? null;
const filteredContent = content.filter(item => !item.title);
</script>
