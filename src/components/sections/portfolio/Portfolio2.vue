<template>
  <v-container>
    <v-row v-if="info?.title" justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info.title) }}</h2>
        <p v-if="info.subtitle" class="text-h6 text-medium-emphasis">{{ getText(info.subtitle) }}</p>
      </v-col>
    </v-row>
    <v-row v-if="categories.length > 0" justify="center" class="mb-6">
      <v-col cols="auto">
        <v-chip-group v-model="selectedCategory" mandatory>
          <v-chip v-for="cat in categories" :key="cat" :value="cat" filter variant="outlined">
            {{ getText(cat) }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in filteredItems" :key="index" cols="12" sm="6" md="4">
        <div class="portfolio-item-masonry" @click="handleClick(item)">
          <v-img :src="resolveImg(item.image)" :aspect-ratio="item.aspectRatio || 1" cover class="portfolio-image">
            <div class="portfolio-info">
              <h4 class="text-h6 font-weight-bold text-white mb-1">{{ getText(item.title) }}</h4>
              <p class="text-body-2 text-white">{{ getText(item.category) }}</p>
            </div>
          </v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useLanguageStore } from '@/stores/language';
import { resolveImg } from '@/utils/mobile';

const props = defineProps({
  content: Array,
  info: Object
});

const { getText } = useLanguageStore();

const categories = computed(() => {
  const cats = new Set();
  props.content?.forEach(item => {
    if (item.category) cats.add(JSON.stringify(item.category));
  });
  return [{ en: 'All', it: 'Tutti' }, ...Array.from(cats).map(c => JSON.parse(c))];
});

const selectedCategory = ref({ en: 'All', it: 'Tutti' });

const filteredItems = computed(() => {
  if (!props.content) return [];
  const selCat = getText(selectedCategory.value);
  if (selCat === 'All' || selCat === 'Tutti') return props.content;
  return props.content.filter(item => getText(item.category) === selCat);
});

const handleClick = (item) => {
  if (item.link) window.open(item.link, '_blank');
};
</script>

<style scoped>
.portfolio-item-masonry {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 16px;
}

.portfolio-image {
  transition: transform 0.3s;
}

.portfolio-item-masonry:hover .portfolio-image {
  transform: scale(1.1);
}

.portfolio-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.3s;
}

.portfolio-item-masonry:hover .portfolio-info {
  transform: translateY(0);
}
</style>
