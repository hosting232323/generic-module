<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue';

import { onMounted } from 'vue';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
onMounted(() => dataStore.initData());
</script>
