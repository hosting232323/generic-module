<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Download'"/>
    <v-row class="margin_top__default">
      <v-col
        v-for="(file, index) in content.files"
        :key="index"
        cols="12"
        :md="content.columns || 6"
      >
        <v-card elevation="10" class="download-card">
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon
                :icon="getFileIcon(file.type)"
                :color="info.primaryColor"
                size="60"
                class="mr-4"
              />
              <div class="flex-grow-1">
                <h3 class="mb-2" v-html="getText(file.name)"/>
                <p v-if="file.description" class="text-body-2 mb-2" v-html="getText(file.description)"/>
                <div class="text-caption text-grey">
                  <span v-if="file.size">{{ file.size }}</span>
                  <span v-if="file.size && file.type"> • </span>
                  <span v-if="file.type">{{ file.type.toUpperCase() }}</span>
                </div>
              </div>
              <v-btn
                :color="info.primaryColor"
                icon="mdi-download"
                :href="file.url"
                download
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const getFileIcon = (type) => {
  const iconMap = {
    pdf: 'mdi-file-pdf-box',
    doc: 'mdi-file-word',
    docx: 'mdi-file-word',
    xls: 'mdi-file-excel',
    xlsx: 'mdi-file-excel',
    ppt: 'mdi-file-powerpoint',
    pptx: 'mdi-file-powerpoint',
    zip: 'mdi-folder-zip',
    rar: 'mdi-folder-zip',
    jpg: 'mdi-file-image',
    jpeg: 'mdi-file-image',
    png: 'mdi-file-image',
    gif: 'mdi-file-image',
    mp4: 'mdi-file-video',
    mp3: 'mdi-file-music'
  };
  return iconMap[type?.toLowerCase()] || 'mdi-file-document';
};
</script>

<style scoped>
.download-card {
  transition: transform 0.3s ease;
}
.download-card:hover {
  transform: translateY(-5px);
}
</style>
