<template>
  <BaseLayout>
    <Menu />
  </BaseLayout>
</template>

<script setup>
import Menu from '@/views/Menu.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';

import { useDataStore } from '@/stores/data';
import { onMounted, defineProps } from 'vue';

defineProps({
  hostname: {
    type: String,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  }
});

const dataStore = useDataStore();
onMounted(() => dataStore.initDataByDemoLayout(props.hostname, props.id));
</script>
