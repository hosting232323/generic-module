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
  console.log('Fetching posts...');
  http.getRequestGenericBE('blog/post', [], (data) => {
    console.log('Posts fetched:', data);
    posts.value = data.posts || data || []; // Adjust according to the actual data structure
  },'GET', router);
};

const addOrUpdatePost = () => {
  console.log('Adding or updating post:', currentPost.value);
  if (currentPost.value.title && currentPost.value.content) {
    const method = currentPost.value.id ? 'PATCH' : 'POST';
    console.log('Method:', method);
    http.postRequestGenericBE('blog/post', currentPost.value, () => {
      console.log('Post added/updated successfully');
      fetchPosts();
      resetCurrentPost();
    }, method, router);  // Assuming the genericBackend flag is required
  } else {
    console.log('Title or content is missing');
  }
};

const editPost = (post) => {
  console.log('Editing post:', post);
  currentPost.value = { ...post };
};

const cancelEdit = () => {
  console.log('Cancelling edit');
  resetCurrentPost();
};

const deletePost = (id) => {
  http.getRequestGenericBE('blog/post', {
    id: id
  }, () => {
    console.log('Post deleted successfully');
    fetchPosts();
    resetCurrentPost();
  }, 'DELETE', router);  // Assuming the genericBackend flag is required
};

const resetCurrentPost = () => {
  console.log('Resetting current post');
  currentPost.value = {
     title: '',
    content: '',
    topics: [],
    files: []
  };
};

onMounted(() => {
  console.log('Component mounted');
  fetchPosts();
});
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
