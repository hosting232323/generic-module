<template>
  <v-container>
    <h1>Gestione del Blog</h1><br>
    <Form />
    <v-divider class="my-4" />
    <List />
  </v-container>
</template>

<script setup>
  import Form from '@/components/blogManagement/Form';
  import List from '@/components/blogManagement/List';

  import { usePostStore } from '@/stores/posts';

  const postStore = usePostStore();
  const { initData } = postStore;

  initData();
</script>
