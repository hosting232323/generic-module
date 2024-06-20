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
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(post, index) in posts" :key="post.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ post.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" variant="outlined" v-bind="props" />
                      </template>
                      <v-list>
                        <v-list-item @click="editPost(post)">
                          <v-btn icon="mdi-pencil" variant="text">Edit</v-btn>
                        </v-list-item>
                        <v-list-item @click="deletePost(post.id)">
                          <v-btn icon="mdi-delete" variant="text" color="red">Delete</v-btn>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import http from '@/utils/http';

const currentPost = ref({
  id: null,
  title: '',
  content: ''
});

const posts = ref([]);

const fetchPosts = () => {
  http.getRequest('blog/post', {}, (data) => {
    posts.value = data;
  });
};

const addOrUpdatePost = () => {
  if (currentPost.value.title && currentPost.value.content) {
    const endpoint = currentPost.value.id ? `blog/post/${currentPost.value.id}` : '/blog/post';
    const method = currentPost.value.id ? 'PATCH' : 'POST';
    http.postRequest(endpoint, currentPost.value, () => {
      fetchPosts();
      resetCurrentPost();
    }, method, true);  // Assuming the genericBackend flag is required
  }
};

const editPost = (post) => {
  currentPost.value = { ...post };
};

const cancelEdit = () => {
  resetCurrentPost();
};

const deletePost = (id) => {
  http.postRequest(`blog/post`, { id }, () => {
    fetchPosts();
  }, 'DELETE', true);  // Assuming the genericBackend flag is required
};

const resetCurrentPost = () => {
  currentPost.value = {
    id: null,
    title: '',
    content: ''
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
