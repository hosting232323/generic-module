<template>
  <v-row>
    <v-col v-for="post in posts" cols="12" md="6">
      <v-card class="mb-4" :title="post.title" :content="post.content">
        <v-card-actions>
          <v-spacer />
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props" />
            </template>
            <v-list>
              <v-list-item @click="editCurrentPost(post)" title="Modifica" />
              <v-list-item @click="deletePost(post.id)" title="Elimina" />
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '@/stores/posts';

  const postStore = usePostStore();
  const { initData, resetCurrentPost, editCurrentPost } = postStore;
  const { posts, currentPost } = storeToRefs(postStore);

  const deletePost = (id) => {
    http.getRequestGenericBE('blog/post', {
      id: id
    }, function (data) {
      initData();
      if (currentPost.id && currentPost.id === id)
        resetCurrentPost();
    }, 'DELETE', router);
  };
</script>
