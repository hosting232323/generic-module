<template>
  <BaseLayout>
    <ProductDetails />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue';
import ProductDetails from '@/views/ProductDetails.vue';

import { useDataStore } from '@/stores/data';
import { onMounted, defineProps } from 'vue';

const props = defineProps({
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
