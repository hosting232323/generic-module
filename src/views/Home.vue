<template>
  <InfiniteScroll :sections="sections" :info="info" />
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useHead } from '@vueuse/head';
import { useDataStore } from '@/stores/data';
import InfiniteScroll from '@/components/InfiniteScroll.vue';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const sections = computed(() => data.value.components);
const info = computed(() => data.value.info);

useHead({
  title: 'Home Page',
  meta: [
    { name: 'Fast Site', content: 'This is the home page' }
  ]
});
</script>