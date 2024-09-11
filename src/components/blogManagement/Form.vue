<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat :title="currentPost.id ? `Modifica il post: ${currentPost.title}` : 'Crea un post'" />
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addOrUpdatePost">
        <v-text-field v-model="currentPost.title" label="Titolo" required />
        <v-textarea v-model="currentPost.content" label="Contenuto" required />
        <v-autocomplete v-model="currentPost.topics" :items="topics" label="Topic" item-title="name" item-value="id" multiple required />
        <Images />
        <Enrichments />
        <v-btn type="submit" :color="data.info.primaryColor" class="mt-4">
          {{ currentPost.id ? 'Modifica Post' : 'Crea Post' }}
        </v-btn>
        <v-btn v-if="currentPost.id" :color="data.info.primaryColor" @click="resetCurrentPost" class="mt-4 ml-2" text="Cancella" />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useDataStore } from '@/stores/data';
  import { usePostStore } from '@/stores/posts';

  import Images from '@/components/blogManagement/Images';
  import Enrichments from '@/components/blogManagement/Enrichments';

  const router = useRouter();
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const postStore = usePostStore();
  const { initPosts, resetCurrentPost } = postStore;
  const { currentPost, topics } = storeToRefs(postStore);

  const addOrUpdatePost = () => {
    if (currentPost.value.title && currentPost.value.content)
      http.postRequestGenericBE('blog/post', currentPost.value, function (data) {
        initPosts(router);
        resetCurrentPost();
      }, currentPost.value.id ? 'PATCH' : 'POST', router);
  };
</script>
