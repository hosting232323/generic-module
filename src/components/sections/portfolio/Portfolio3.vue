<template>
  <v-container fluid class="pa-0">
    <v-row v-if="info?.title" justify="center" class="mb-8 px-4">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <div class="portfolio-grid-fullwidth">
      <div v-for="(item, index) in content" :key="index" class="portfolio-item-full" @click="handleClick(item)">
        <v-img :src="resolveImg(item.image)" cover height="400">
          <div class="portfolio-content-full">
            <v-chip v-if="item.category" color="white" variant="flat" size="small" class="mb-4">
              {{ getText(item.category) }}
            </v-chip>
            <h3 class="text-h4 font-weight-bold text-white mb-2">{{ getText(item.title) }}</h3>
            <p class="text-body-1 text-white mb-4">{{ getText(item.description) }}</p>
            <v-btn v-if="item.link" color="white" variant="outlined" size="small">
              {{ getText({ en: 'View Project', it: 'Vedi Progetto' }) }}
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-img>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const handleClick = (item) => {
  if (item.link) window.open(item.link, '_blank');
};
</script>

<style scoped>
.portfolio-grid-fullwidth {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}

.portfolio-item-full {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.portfolio-item-full::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  transition: background 0.3s;
}

.portfolio-item-full:hover::before {
  background: rgba(0, 0, 0, 0.7);
}

.portfolio-content-full {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 48px;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
}

.portfolio-item-full:hover .portfolio-content-full {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .portfolio-grid-fullwidth {
    grid-template-columns: 1fr;
  }
}
</style>
