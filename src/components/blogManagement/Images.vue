<template>
  <v-expansion-panels>
    <v-expansion-panel :title="`Immagini ${type}`">
      <v-expansion-panel-text>
        <v-file-input
          accept="image/*"
          label="Carica qui la tua immagine"
          @change="uploadImage"
          v-model="fileInput"
          :loading="loading"
          :error-messages="fileError"
        />
        <v-card
          title="Immagini caricate"
          v-if="currentPost[type == 'mobile' ? 'mobile_files' : 'desktop_files'] &&
                currentPost[type == 'mobile' ? 'mobile_files' : 'desktop_files'].length > 0"
        >
          <v-card-text>
            <v-slide-group show-arrows>
              <v-slide-group-item v-for="(image, index) in currentPost[type == 'mobile' ? 'mobile_files' : 'desktop_files']">
                <v-card elevation="5" class="mr-5">
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
</template>

<script setup>
  import { ref } from 'vue';
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { v4 as uuidv4 } from 'uuid';
  import { useRouter } from 'vue-router';
  import { usePostStore } from '@/stores/posts';

  const imageLoading = ref(false);
  const fileError = ref('');
  const fileInput = ref([]);
  const router = useRouter();
  const loading = ref(false);
  const postStore = usePostStore();
  const { type } = defineProps(['type']);
  const { currentPost } = storeToRefs(postStore);

  const uploadImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    fileError.value = '';
    const bucketName = 'blogfast';
    const filename = `${uuidv4()}.${selectedFile.name.split('.').pop()}`;
    imageLoading.value = true;
    http.postRequestFileGenericBE(`upload-file/${bucketName}/${filename}`, selectedFile, function (data) {
      if (data.status === 'ok')
        currentPost.value.cover = `https://${bucketName}.s3.eu-north-1.amazonaws.com/${filename}`;
      else
        fileError.value = "Errore nel caricamento del file: formato non supportato.";

      fileInput.value = [];
      imageLoading.value = false;
    }, 'POST', router);
  };

  const deleteImage = (index) => {
    const listType = type == 'mobile' ? 'mobile_files' : 'desktop_files';
    currentPost.value[listType].splice(index, 1);
  };
</script>
