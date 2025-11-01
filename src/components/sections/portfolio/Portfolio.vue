<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'I nostri progetti'"/>
    <v-row v-if="content.filters" class="margin_top__default mb-6" justify="center">
      <v-col cols="12" class="text-center">
        <v-chip-group v-model="selectedFilter" mandatory>
          <v-chip
            v-for="filter in content.filters"
            :key="filter"
            :value="filter"
            :color="info.primaryColor"
            variant="outlined"
            v-html="getText(filter)"
          />
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(project, index) in filteredProjects"
        :key="index"
        cols="12"
        sm="6"
        :md="content.columns || 4"
      >
        <v-card elevation="10" class="portfolio-card" @click="openProject(project)">
          <v-img :src="resolveImg(project.image)" :height="isMobile ? 250 : 300" cover>
            <div class="portfolio-overlay">
              <v-icon icon="mdi-magnify-plus-outline" size="50" color="white"/>
            </div>
          </v-img>
          <v-card-title v-html="getText(project.name)"/>
          <v-card-subtitle v-if="project.category" v-html="getText(project.category)"/>
          <v-card-text v-if="project.description">
            <p v-html="getText(project.description)"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguageStore } from '@/stores/language';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';

const isMobile = setupMobileUtils();
const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const selectedFilter = ref(content.filters ? content.filters[0] : null);

const filteredProjects = computed(() => {
  if (!content.filters || !selectedFilter.value) {
    return content.projects;
  }
  return content.projects.filter(project => 
    project.category === selectedFilter.value || selectedFilter.value === 'Tutti'
  );
});

const openProject = (project) => {
  if (project.url) {
    window.open(project.url, '_blank');
  }
};
</script>

<style scoped>
.portfolio-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}
.portfolio-card:hover {
  transform: translateY(-10px);
}
.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}
.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
