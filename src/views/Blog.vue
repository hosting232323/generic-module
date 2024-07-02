<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-toolbar flat>
              <v-toolbar-title>My Blog</v-toolbar-title>
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addOrUpdatePost">
              <v-text-field v-model="currentPost.title" label="Title" required></v-text-field>
              <v-textarea v-model="currentPost.content" label="Content" required></v-textarea>
              <v-btn type="submit" color="primary">{{ currentPost.id ? 'Update Post' : 'Add Post' }}</v-btn>
              <v-btn v-if="currentPost.id" color="secondary" @click="cancelEdit">Cancel</v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col v-for="post in posts" :key="post.id" cols="12" md="6">
                <v-card class="mb-4">
                  <v-card-title>{{ post.title }}</v-card-title>
                  <v-card-text>{{ post.content }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="editPost(post)">
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="deletePost(post.id)">
                          <v-list-item-title class="red--text">Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import http from '@/utils/http';
import router from '../plugins/router';

const currentPost = ref({
  id: null,
  title: '',
  content: '',
  subtitle: '',
  enrichment: '',
  topics: [],
  files: []
});

const posts = ref([]);

const fetchPosts = () => {
  http.getRequestGenericBE('blog/post', [], (data) => {
    posts.value = data.posts || data || [];
  },'GET', router);
};

const addOrUpdatePost = () => {
  if (currentPost.value.title && currentPost.value.content) {
    const method = currentPost.value.id ? 'PATCH' : 'POST';
    http.postRequestGenericBE('blog/post', currentPost.value, () => {
      fetchPosts();
      resetCurrentPost();
    }, method, router);
  }
};

const editPost = (post) => {
  currentPost.value = { ...post };
};

const cancelEdit = () => {
  resetCurrentPost();
};

const deletePost = (id) => {
  http.getRequestGenericBE('blog/post', {
    id: id
  }, () => {
    fetchPosts();
    resetCurrentPost();
  }, 'DELETE', router);
};

const resetCurrentPost = () => {
  currentPost.value = {
    title: '',
    content: '',
    topics: [],
    files: []
  };
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
