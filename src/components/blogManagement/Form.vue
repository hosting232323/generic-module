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
        <v-expansion-panels>
          <v-expansion-panel title="Immagini">
            <v-expansion-panel-text>
              <v-file-input accept="image/*" label="Carica qui la tua immagine" @change="uploadImage" />
              <v-card title="Immagini caricate" v-if="currentPost.files && currentPost.files.length > 0">
                <v-card-text>
                  <v-slide-group show-arrows>
                    <v-slide-group-item v-for="(image, index) in currentPost.files">
                      <v-card elevation="5">
                        <v-img :src="image" width="200" height="200" />
                        <v-card-actions>
                          <v-spacer />
                          <v-btn icon="mdi-delete" @click="deleteImage(index)" />
                        </v-card-actions>
                      </v-card>
                    </v-slide-group-item>
                  </v-slide-group>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn type="submit" :text="currentPost.id ? 'Modifica Post' : 'Crea Post'" :loading="loading" :color="data.info.primaryColor" class="mt-4" />
        <v-btn v-if="currentPost.id" :color="data.info.primaryColor" @click="resetCurrentPost" class="mt-4 ml-2" text="Cancella" />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import http from '@/utils/http';
  import { v4 as uuidv4 } from 'uuid';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useDataStore } from '@/stores/data';
  import { usePostStore } from '@/stores/posts';
  import { useLoader } from '@/stores/loader';
  import { ref } from 'vue';

  const router = useRouter();
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const postStore = usePostStore();
  const { initPosts, resetCurrentPost } = postStore;
  const { currentPost, topics, enrichmentTypes } = storeToRefs(postStore);

  const loaderStore = useLoader();
  const loading = storeToRefs(loaderStore).loading;
  const { updateLoader } = loaderStore;

  const addOrUpdatePost = () => {
    if (currentPost.value.title && currentPost.value.content){
      updateLoader(true);
      http.postRequestGenericBE('blog/post', currentPost.value, function (data) {
        initPosts();
        resetCurrentPost();
        updateLoader(false);
      }, currentPost.value.id ? 'PATCH' : 'POST', router);
    }
  };

  const uploadImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile)  return;

    updateLoader(true);

    const bucketName = 'fastsitepictures';
    const filename = `${uuidv4()}.${selectedFile.name.split('.').pop()}`;
    http.postRequestFileGenericBE(`upload-file/${bucketName}/${filename}`, selectedFile, function (data) {
      if (data.status === 'ok')
        currentPost.value.files.push(`https://${bucketName}.s3.eu-north-1.amazonaws.com/${filename}`);
      else
        console.error('File upload failed:', data.error);
      updateLoader(false);
    }, 'POST', router);
  };

  const deleteImage = (index) => {
    currentPost.value.files.splice(index, 1);
  };
</script>
