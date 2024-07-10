<template>
    <div class="welcome-blog">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <ul>
        <li v-for="post in recentPosts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const title = ref('Welcome to My Blog')
  const description = ref('Here you\'ll find my thoughts on various topics.')
  const recentPosts = ref([
    { id: 1, title: 'My First Blog Post' },
    { id: 2, title: 'Reflections on Vue.js' },
    { id: 3, title: 'The Joy of Coding' }
  ])
  </script>
  
  <style scoped>
  .welcome-blog {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>