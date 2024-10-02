<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat :title="currentPost.id ? `Modifica il post: ${currentPost.title}` : 'Crea un post'" />
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addOrUpdatePost">
        <v-text-field
          v-model="currentPost.title"
          label="Titolo"
          :rules="validation.requiredRules"
        />
        <v-textarea
          v-model="currentPost.content"
          label="Contenuto"
          :rules="validation.requiredRules"
        />
        <v-autocomplete v-model="currentPost.topics" :items="topics.map(topic => topic.name)" label="Topic" multiple required />
        <v-row no-gutters>
          <v-col cols="10">
            <v-file-input accept="image/*" label="Immagine di copertina" @change="uploadImage" v-model="fileInput" />
          </v-col>
          <v-col cols="2">
            <v-img :src="currentPost.cover" height="65" />
          </v-col>
        </v-row>
        <Images type="desktop" />
        <Images type="mobile" />
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
  import { ref } from 'vue';
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { v4 as uuidv4 } from 'uuid';
  import { useRouter } from 'vue-router';
  import validation from '@/utils/validation';
  import { useDataStore } from '@/stores/data';
  import { usePostStore } from '@/stores/posts';

  import Images from '@/components/blogManagement/Images';
  import Enrichments from '@/components/blogManagement/Enrichments';

  const fileInput = ref([]);
  const router = useRouter();
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const postStore = usePostStore();
  const { initPosts, resetCurrentPost } = postStore;
  const { currentPost, topics } = storeToRefs(postStore);

  const addOrUpdatePost = () => {
    if (
      !validation.validateInput(currentPost.value.title, validation.requiredRules) &&
      !validation.validateInput(currentPost.value.content, validation.requiredRules)
    )
      http.postRequestGenericBE('blog/post', currentPost.value, function (data) {
        initPosts(router);
        resetCurrentPost();
      }, currentPost.value.id ? 'PATCH' : 'POST', router);
  };

  const uploadImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile)  return;

    const bucketName = 'blogfast';
    const filename = `${uuidv4()}.${selectedFile.name.split('.').pop()}`;
    http.postRequestFileGenericBE(`upload-file/${bucketName}/${filename}`, selectedFile, function (data) {
      if (data.status === 'ok')
        currentPost.value.cover = `https://${bucketName}.s3.eu-north-1.amazonaws.com/${filename}`;
      else
        console.error('File upload failed:', data.error);
      fileInput.value = [];
    }, 'POST', router);
  };
</script>
