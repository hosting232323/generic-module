<template>
  <v-container class="transparent-container">
    <v-card elevation="0" class="transparent-card">
      <v-card-title class="title-card">
        <v-icon class="mr-2">mdi-web</v-icon>
        Chi ci ha già scelto
      </v-card-title>
      <v-card-text>
        <div class="scrollable-container">
          <div class="url-list">
            <div v-for="(site, index) in visibleContent" :key="index" class="url-item" :class="{ 'center-item': index === 1 }">
              <a :href="'https://' + site.url" target="_blank" class="url-link">
                {{ site.name }}
              </a>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { content } = defineProps(['content']);
const visibleContent = ref([]);

let scrollInterval = null;

const startScrolling = () => {
  let index = 0;
  visibleContent.value = content.slice(index, index + 3);

  scrollInterval = setInterval(() => {
    index = (index + 1) % content.length;
    if (index + 3 <= content.length) {
      visibleContent.value = content.slice(index, index + 3);
    } else {
      visibleContent.value = content.slice(index).concat(content.slice(0, (index + 3) % content.length));
    }
  }, 1000); // Increased the speed of the scrolling
};

onMounted(() => {
  startScrolling();
});

onUnmounted(() => {
  clearInterval(scrollInterval);
});
</script>

<style scoped>
.transparent-container {
  background: transparent;
}

.transparent-card {
  background: transparent;
  box-shadow: none; /* Remove the shadow */
}

.title-card {
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better readability */
  padding: 16px;
  border-bottom: none; /* Remove the bottom border */
}

.scrollable-container {
  max-height: 200px; /* Adjust height as needed */
  overflow: hidden;
}

.url-list {
  animation: scroll 3s linear infinite; /* Increased speed of scrolling */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.url-item {
  font-weight: bold;
  margin: 8px 0;
  color: #f34455;
  transition: transform 0.5s, font-size 0.5s;
}

.url-item.center-item {
  transform: scale(1.5);
  font-size: 1.5em;
  color: white;
}

.url-link {
  text-decoration: none;
  color: inherit;
}

@keyframes scroll {
  0% {
    transform: translateY(100%); /* Start from the bottom */
  }
  100% {
    transform: translateY(-100%); /* Move to the top */
  }
}
</style>
