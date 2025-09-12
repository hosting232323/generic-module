<template>
  <BaseLayout>
    <Home />
  </BaseLayout>
</template>

<script setup>
import Home from '@/views/Home.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';

import { setIsMobile } from '@/utils/mobile';
import { useDataStore } from '@/stores/data';
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  json: Object,
  isMobile: Boolean
});

const dataStore = useDataStore();
onMounted(() => {
  dataStore.initDataByJson(props.json);
  if (props.isMobile !== undefined)
    setIsMobile(props.isMobile);
});
</script>