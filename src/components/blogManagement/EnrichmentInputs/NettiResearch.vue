<template>
  <v-expansion-panels>
    <v-expansion-panel title="Dettagli Ricerche">
      <v-expansion-panel-text>
        <v-autocomplete
          v-model="currentPost.enrichment.backgroundColor"
          :items="['purple', 'grey', 'blue', 'red']"
          label="Colore"
        />
        <v-autocomplete
          v-model="currentPost.enrichment.didacticalArea"
          :items="['D', 'DA', 'ACA', 'TDL']"
          label="Area didattica"
        />
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
