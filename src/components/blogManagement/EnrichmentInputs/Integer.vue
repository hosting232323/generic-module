<template>
  <v-text-field
    type="number"
    :v-model="currentPost.enrichment[enrichment.name]"
    :label="enrichment.name"
  />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '@/stores/posts';

  const postStore = usePostStore();
  const { currentPost } = storeToRefs(postStore);

  const { enrichment } = defineProps(['enrichment']);
</script>
