<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      {{ getText(content.title) || 'I miei articoli' }}
    </h1>
    <div class="articles-wrapper margin_top__default">
      <div v-for="(article, index) in articles" :key="index" class="article-item mt-2">
        <img :src="resolveImg(article.cover)" class="img"/>
        <p :style="{ color: info.primaryColor, fontWeight: 700 }">{{ getText(article.title) }}</p>
        <p>{{ truncate(getText(article.content)) }}</p>
      </div>
    </div>
    <p class="margin_top__default"><a href="/blog" class="link" :style="{ color: info.primaryColor }">{{ getText(content.url)}} </a></p>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLanguageStore } from '@/stores/language';
import http from '@/utils/http';
import { resolveImg } from '@/utils/mobile';


const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const articles = ref([]);
const isStatic = computed(() => content.type === 'static');

const truncate = (text) => {
  if (!text) return '';
  return text.length > 150 ? text.slice(0, 150) + '...' : text;
};

onMounted(() => {
  if (isStatic.value) {
    articles.value = content.articles;
  } else {
    http.getRequestGenericBE('blog/post', { project: 'dorianadinanni.it' }, (data) => {
      articles.value = data.posts.slice(0, 3).reverse();
    });
  }
})
</script>

<style scoped>
.articles-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.article-item {
  width: 300px;
  border-radius: 8px;
}

.img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.link {
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  display: inline-block;
}

.link::after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}

.link:hover::after {
  width: 100%;
  left: 0;
  transform: none;
}
</style>
