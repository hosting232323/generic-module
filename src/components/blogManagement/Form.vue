<template>
  <v-btn v-if="!showForm" :color="data.info.primaryColor" @click="toggleForm(true)">
    Crea un post
  </v-btn>
  <v-card>
    <v-card-title v-if="showForm">
      <span >{{ currentPost.id ? `Modifica il post: ${currentPost.title}` : 'Crea un post' }}</span>
    </v-card-title>
    
    <v-card-text v-if="showForm">
      <v-form ref="form" @submit.prevent="addOrUpdatePost">
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
        <v-autocomplete
          v-model="currentPost.topics"
          :items="topics.map(topic => topic.name)"
          label="Topic" multiple required
        />
        <v-row no-gutters>
          <v-col cols="10">
            <v-file-input accept="image/*" label="Immagine di copertina" @change="uploadImage" v-model="fileInput" :loading="loading" :error-messages="fileError" />
          </v-col>
          <v-col cols="2">
            <v-img :src="currentPost.cover" height="65" />
          </v-col>
        </v-row>

        <v-text-field v-model="currentPost.ordinal" label="Posizionamento" type="number" />

        <Images type="desktop" />
        <Images type="mobile" />
        <Enrichments />

        <v-btn type="submit" :color="data.info.primaryColor" class="mt-4" :text="currentPost.id ? 'Modifica Post' : 'Crea Post'" :loading="loading" />
        <v-btn v-if="currentPost.id" :color="data.info.primaryColor" @click="resetCurrentPost" class="mt-4 ml-2" text="Reset" />
        <v-btn @click="closeForm" class="mt-4 ml-2" text="Annulla" />
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

const fileError = ref('');
const fileInput = ref([]);
const router = useRouter();
const loading = ref(false);
const form = ref(null);
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const postStore = usePostStore();
const { initPosts, resetCurrentPost, clearCurrentPost, toggleForm } = postStore;
const { currentPost, topics, showForm } = storeToRefs(postStore);

const addOrUpdatePost = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  http.postRequestGenericBE('blog/post', currentPost.value, function (data) {
    initPosts(router);
    clearCurrentPost();
    loading.value = false;
    toggleForm(false);
  }, currentPost.value.id ? 'PATCH' : 'POST', router);
};

const uploadImage = (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  fileError.value = '';
  const bucketName = 'blogfast';
  const filename = `${uuidv4()}.${selectedFile.name.split('.').pop()}`;
  loading.value = true;
  http.postRequestFileGenericBE(`upload-file/${bucketName}/${filename}`, selectedFile, function (data) {
    if (data.status === 'ok')
      currentPost.value.cover = `https://${bucketName}.s3.eu-north-1.amazonaws.com/${filename}`;
    else
      fileError.value = "Errore nel caricamento del file: formato non supportato.";

    fileInput.value = [];
    loading.value = false;
  }, 'POST', router);
};

const closeForm = () => {
  clearCurrentPost();
  toggleForm(false);
};
</script>
