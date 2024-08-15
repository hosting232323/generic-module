<template>
  <component v-for="enrichment in enrichments" :is="inputMap[enrichment.type]" :enrichment="enrichment" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '@/stores/posts';

  import String from '@/components/blogManagement/EnrichmentInputs/String';
  import NettiPost from '@/components/blogManagement/EnrichmentInputs/NettiPost';
  import NettiResearch from '@/components/blogManagement/EnrichmentInputs/NettiResearch';

  const postStore = usePostStore();
  const { enrichments } = storeToRefs(postStore);

  const inputMap = {
    string: String,
    'netti post': NettiPost,
    'netti research': NettiResearch
  };
</script>
