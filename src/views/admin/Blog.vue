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

import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/posts';

const router = useRouter();
const postStore = usePostStore();
const { initPosts, initTopics, initEnrichments } = postStore;

initPosts(router);
initTopics(router);
initEnrichments(router);
</script>
