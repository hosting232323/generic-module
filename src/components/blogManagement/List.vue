<template>
  <v-row>
    <v-col v-for="post in posts" :key="post.id" cols="12" md="6">
      <v-card class="mb-4">
        <v-row>
          <v-col cols="4">
            <v-img 
              v-if="post.files && post.files.length" 
              :src="post.files[0]" 
              alt="Post Image" 
              height="200px" 
              class="rounded"
            />
          </v-col>
          <v-col cols="8">
            <v-card-title class="py-0">
              {{ post.title }}
            </v-card-title>
          </v-col>
        </v-row>
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
  import { useRouter } from 'vue-router';
  import { usePostStore } from '@/stores/posts';

  const router = useRouter();
  const postStore = usePostStore();
  const { initPosts, resetCurrentPost, editCurrentPost } = postStore;
  const { posts, currentPost } = storeToRefs(postStore);

  const deletePost = (id) => {
    http.getRequestGenericBE('blog/post', {
      id: id
    }, function (data) {
      initPosts();
      if (currentPost.id && currentPost.id === id)
        resetCurrentPost();
    }, 'DELETE', router);
  };
</script>
