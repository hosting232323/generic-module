<template>
  <BaseLayout>
    <HomePage />
  </BaseLayout>
</template>

<script setup>
import HomePage from '@/views/HomePage.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';

import { setIsMobile } from '@/utils/mobile';
import { useDataStore } from '@/stores/data';
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  json: {
    type: Object,
    required: true
  },
  isMobile: Boolean
});

const dataStore = useDataStore();
onMounted(() => {
  dataStore.initDataByJson(props.json);
  if (props.isMobile !== undefined)
    setIsMobile(props.isMobile);
});
</script>
