<template>
  <BaseLayout>
    <Blog />
  </BaseLayout>
</template>

<script setup>
import Blog from '@/views/Blog.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';

import { useDataStore } from '@/stores/data';
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  hostname: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  }
});

const dataStore = useDataStore();
onMounted(() => dataStore.initDataByDemoOrTemplateLayout(props.hostname, props.type, props.id));
</script>
