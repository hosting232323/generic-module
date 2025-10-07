<template>
  <v-container>
    <h1
      :style="{ color: info.primaryColor }"
      v-html="getText(content.title) || 'I nostri ultimi post'"
    />
    <CarouselWrapper
      :items="latestItems"
      :primary-color="info.primaryColor"
      :item-key="(item, index) => item.name + '-' + index"
    >
      <template #default="{ item }">
        <div>
          <v-img
            height="300"
            :src="getImageForProduct(item)"
            fill
          />
          <p
            class="title"
            :style="{ color: info.primaryColor }"
          >
            {{ item.title }}
          </p>
          <p>{{ truncate(item.content) }}</p>
          <p
            class="more"
            @click="goToPost(item.id)"
          >
            Scopri di più...
          </p>
        </div>
      </template>
    </CarouselWrapper>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

import { useLanguageStore } from '@/stores/language';
import CarouselWrapper from '@/components/sections/CarouselWrapper.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const blog = data.value.blog;
const flaggedItems = blog.filter(item => item.highlight === true);
const latestItems = flaggedItems.length > 0 ? flaggedItems.slice(0, 3) : blog.slice(-3);

const truncate = (text) => {
  if (!text) return '';
  return text.length > 150 ? text.slice(0, 150) + '...' : text;
};

const getImageForProduct = (product) => {
  return product?.cover ? product.cover : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

const goToPost = (id) => {
  router.push(`/blog/${id}`);
};
</script>

<style scoped>
.title {
  font-weight: 700;
}
.more {
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  position: relative;
  display: inline-block;
}

.more::after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}

.more:hover::after {
  width: 100%;
  left: 0;
  transform: none;
}
</style>
