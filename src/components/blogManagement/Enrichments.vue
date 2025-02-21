<template>
  <component v-for="enrichment in enrichments" :is="inputMap[enrichment.type]" :enrichment="enrichment" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '@/stores/posts';

  import String from '@/components/blogManagement/EnrichmentInputs/String';
  import Integer from '@/components/blogManagement/EnrichmentInputs/Integer';

  const postStore = usePostStore();
  const { enrichments } = storeToRefs(postStore);

  const inputMap = {
    string: String,
    integer: Integer
  };
</script>
