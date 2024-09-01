<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle v-model="selectedTopic" mandatory>
          <v-btn value="null">Tutti</v-btn>
          <v-btn v-for="topic in topics" :key="topic.id" :value="topic.id">
            {{ topic.name }}
          </v-btn>
          <v-btn value="altri">Altri</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="post in filteredPosts" :key="post.id" cols="12" md="6">
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
              <v-card-subtitle>
                Topics: {{ post.topics.join(', ') || 'None' }}
              </v-card-subtitle>
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
  </v-container>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/posts';
import http from '@/utils/http';

const router = useRouter();
const postStore = usePostStore();
const {topics, filteredPosts, selectedTopic } = storeToRefs(postStore);
const {editCurrentPost} = postStore;


onMounted(() => {
  postStore.initPosts();
  postStore.initTopics();
});

watch(selectedTopic, (newTopic) => {
  postStore.setSelectedTopic(newTopic === 'null' ? null : newTopic);
});

const deletePost = async (id) => {
  try {
    await http.getRequestGenericBE('blog/post', { id }, () => {
      postStore.initPosts();
      if (postStore.currentPost.id === id) {
        postStore.resetCurrentPost();
      }
    }, 'DELETE', router);
  } catch (error) {
  }
};
</script>

<style scoped>
  .actions {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
