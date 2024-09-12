<template>
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
</template>

<script setup>
  import http from '@/utils/http';
  import { storeToRefs } from 'pinia';
  import { v4 as uuidv4 } from 'uuid';
  import { useRouter } from 'vue-router';
  import { usePostStore } from '@/stores/posts';

  const router = useRouter();
  const postStore = usePostStore();
  const { currentPost } = storeToRefs(postStore);

  const uploadImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile)  return;

    const bucketName = 'blogfast';
    const filename = `${uuidv4()}.${selectedFile.name.split('.').pop()}`;
    http.postRequestFileGenericBE(`upload-file/${bucketName}/${filename}`, selectedFile, function (data) {
      if (data.status === 'ok')
        currentPost.value.files.push({
          type: 'Desktop',
          key: `https://${bucketName}.s3.eu-north-1.amazonaws.com/${filename}`
        });
      else
        console.error('File upload failed:', data.error);
    }, 'POST', router);
  };

  const deleteImage = (index) => {
    currentPost.value.files.splice(index, 1);
  };
</script>
