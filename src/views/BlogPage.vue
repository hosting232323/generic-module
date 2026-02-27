<template>
  <AppLoading
    v-if="!ready"
    :home="false"
  />
  <v-container v-else>
    <h1
      class="text-h3 font-weight-bold"
      :style="{ color: info.primaryColor, margin: '10px 0'}"
    >
      Ultimi post
    </h1>
    <div
      v-for="post in displayedPosts"
      :key="post.id"
    >
      <BlogItem
        :post="post"
      />
    </div>
    <div
      v-if="displayedPosts.length < posts.length"
      class="mt-4"
    >
      <a
        class="more-posts"
        :style="{ color: info.primaryColor }"
        @click="loadMorePosts"
      >Mostra più articoli</a>
    </div>
    <div
      v-else
      class="mt-4"
    >
      <a
        class="more-posts"
        :style="{ color: info.primaryColor }"
        @click="removeMorePosts"
      >Mostra meno</a>
    </div>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import BlogItem from '@/components/sections/BlogItem';
import AppLoading from '@/layouts/AppLoading.vue';
import { useBlogStore } from '@/stores/blog';
import { useDataStore } from '@/stores/data';

const displayedPosts = ref();
const maxItems = 4;
const itemsToShow = ref(maxItems);

const dataStore = useDataStore();
const blogStore = useBlogStore();

const { posts, ready } = storeToRefs(blogStore);
const { data } = storeToRefs(dataStore);
const info = data.value.info;


const displayPosts = () => {
  displayedPosts.value = posts.value.slice(0, itemsToShow.value);
};

const loadMorePosts = () => {
  itemsToShow.value += 5;
};

const removeMorePosts = () => {
  itemsToShow.value = maxItems;
};

if (ready.value)
  displayPosts();
else
  blogStore.initData(data.value.blog, function () {
    displayPosts();
  });

</script>

<style scoped>
.more-posts {
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  display: inline-block;
  font-style: italic;
}

.more-posts::after {
  content: '';
  position: absolute;
  left: 0%;
  bottom: -2px;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}

.more-posts:hover::after {
  width: 100%;
  left: 0;
  transform: none;
}
</style>
