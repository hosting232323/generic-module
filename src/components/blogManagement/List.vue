<template>
  <v-row>
    <v-col cols="12">
      <v-btn-toggle v-model="selectedTopic" mandatory>
        <v-btn value="null" text="Tutti" />
        <v-btn v-for="topic in topics" :value="topic.name" :text="topic.name" />
        <v-btn value="altri" text="Altri" />
      </v-btn-toggle>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-for="post in filteredPosts" :key="post.id" cols="12" md="6">
      <v-card class="mb-4" height="130">
        <v-row>
          <v-col cols="4">
            <v-img 
              v-if="post.cover" 
              :src="post.cover" 
              alt="Post Cover" 
              height="130" 
              class="rounded"
            />
          </v-col>
          <v-col cols="8">
            <v-card-title class="py-0">
              {{ post.title }}
            </v-card-title>
            <v-card-subtitle>
              Topics: {{ post.topics ? post.topics.join(', ') : 'None' }}
            </v-card-subtitle>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  class="actions"
                  variant="text"
                  icon="mdi-dots-vertical"
                  v-bind="props"
                  :loading="loading[post.id]"
                />
              </template>
              <v-list>
                <v-list-item @click="editCurrentPost(post)" title="Modifica" />
                <v-list-item @click="deletePost(post.id)" title="Elimina" />
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import http from '@/utils/http';
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { usePostStore } from '@/stores/posts';

  const loading = ref({});
  const router = useRouter();
  const postStore = usePostStore();
  const { editCurrentPost, initPosts, resetCurrentPost } = postStore;
  const { topics, filteredPosts, selectedTopic, currentPost } = storeToRefs(postStore);

  watch(selectedTopic, (newTopic) => {
    postStore.setSelectedTopic(newTopic === 'null' ? null : newTopic);
  });

  const deletePost = (id) => {
    loading.value[id] = true;
    http.getRequestGenericBE('blog/post', {
      id: id
    }, function (data) {
      initPosts(router);
      if (currentPost.value.id && currentPost.value.id === id)
        resetCurrentPost();
      loading.value[id] = false;
    }, 'DELETE', router);
  };
</script>

<style scoped>
  .actions {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
