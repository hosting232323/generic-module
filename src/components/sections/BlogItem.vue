<template>
  <v-container class="d-flex mt-4 mb-4" v-if="!isMobile">
    <router-link :to="postLink">
      <v-img :src="post.files && post.files[0].preview" width="170px" class="featured-image"/>
    </router-link>

    <div style="margin-left: 15px;">
      <p class="topic-date">{{ formatTopics(post.topics) }} {{ formatDate(post.updated_at) }}</p>
      <p class="reading-time">{{ calculateReadingTime(post.content) }}</p>

      <router-link :to="postLink" style="text-decoration: none;">
        <p class="truncate-title" :style="{ color: info.primaryColor }">{{ post.title }}</p>
      </router-link>

      <p class="truncate-text">{{ post.content }}</p>
    </div>
  </v-container>

  <v-container class="mt-4 mb-4 d-flex flex-column" v-else>
    <router-link :to="postLink">
      <img :src="post.files && post.files[0].preview" class="featured-image">
    </router-link>

    <div>
      <p class="topic-date">{{ formatTopics(post.topics) }} {{ formatDate(post.updated_at) }} - {{ calculateReadingTime(post.content) }}</p>

      <router-link :to="postLink" style="text-decoration: none;">
        <p class="truncate-title" :style="{ color: info.primaryColor }">{{ post.title }}</p>
      </router-link>

      <p class="truncate-text">{{ post.content }}</p>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { setupMobileUtils } from '@/utils/mobile';
import { useDataStore } from '@/stores/data';

const isMobile = setupMobileUtils();

const dataStore = useDataStore();
const { data, demoId } = storeToRefs(dataStore);
const info = data.value.info;

const props = defineProps({
  post: Object,
  height: Number,
  isFeatured: Boolean
});


const getStyle = () => {
  let styleValue = 'px';
  if (props.height)
    styleValue = props.height + styleValue;
  else
    styleValue = '400' + styleValue;
  return isMobile.value ? {
    maxHeight: styleValue
  } : {
    height: styleValue
  };
};

const formatDate = (dateString) => {
  const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];

  const [day, month, year] = dateString.split(" ")[0].split("/");
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
};

const formatTopics = (topics = []) => {
  if(topics.length) return `${topics.join(' - ')} / `;
}

const calculateReadingTime = (content, wordsPerMinute = 200) => {
  if (!content) return "0 min"; 

  const wordCount = content.trim().split(/\s+/).length; // Conta le parole
  const minutes = Math.ceil(wordCount / wordsPerMinute); // Arrotonda per eccesso

  return `${minutes} min di lettura`;
};

const postLink = computed(() => {
  return demoId.value ? `/demo/${demoId.value}/blog/${props.post.id}` : `/blog/${props.post.id}`;
});
</script>


<style scoped>
.featured-post {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.image-container {
  position: relative;
}

.featured-image {
  max-height: 225px;
  align-items: flex-start;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
}

.truncate-title {
  font-size: 24px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.truncate-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  max-height: 4.5em;
  line-height: 1.5em;
}

.topic-date,
.reading-time {
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  text-transform: uppercase;
}

/* Responsività */
@media (max-width: 960px) {
  .text-container {
    left: 50%;
    max-width: 80%;
    padding: 15px;
  }

  .topic-date, .reading-time {
    font-size: 13px
  }
  .featured-image {
    max-height: 150px !important;
  }
  .truncate-title {
    font-size: 16px;
  }
}
</style>
