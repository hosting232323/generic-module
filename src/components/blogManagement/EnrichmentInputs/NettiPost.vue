<template>
  <v-expansion-panels>
    <v-expansion-panel title="Dettagli Post">
      <v-expansion-panel-text>
        <v-text-field v-model="currentPost.enrichment.place" label="Luogo"/>
        <v-text-field v-model="currentPost.enrichment.year" type="number" label="Anno" class="no-spinner" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '@/stores/posts';

  const postStore = usePostStore();
  const { currentPost } = storeToRefs(postStore);
</script>
