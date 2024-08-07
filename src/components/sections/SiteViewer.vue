<template>
  <div ref="scrollContainer" @scroll="handleScroll" class="scroll-container">
    <div class="image-grid">
      <div v-for="(image, index) in displayedImages" :key="index" class="image-item">
        <v-img :src="image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Dynamically import images from the directory
const imageModules = import.meta.glob('/src/assets/images/*.{jpg,jpeg,png,gif}');

const allImages = ref([]);
const displayedImages = ref([]);
const scrollContainer = ref(null);

const imagesPerRow = 3;
const imageHeight = 200; // Adjust based on image aspect ratio and padding

// Load all images
const loadImages = async () => {
  const imagePromises = Object.values(imageModules).map(module => module().then(mod => mod.default));
  allImages.value = await Promise.all(imagePromises);

  // Initialize display of images
  updateDisplayedImages();
};

// Update displayed images to create an infinite scroll effect
const updateDisplayedImages = () => {
  const viewportHeight = window.innerHeight;
  const rowsCount = Math.ceil(viewportHeight / imageHeight);
  
  const repeatCount = Math.ceil((rowsCount * imagesPerRow) / allImages.value.length);
  displayedImages.value = [];

  for (let i = 0; i < repeatCount; i++) {
    displayedImages.value.push(...allImages.value);
  }
};

// Handle scroll event to simulate infinite scrolling
const handleScroll = () => {
  const container = scrollContainer.value;
  
  // Check if user is near the bottom of the container
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
    // Append more images if scrolling close to the bottom
    updateDisplayedImages();
  }

  // Adjust scroll position to simulate infinite scrolling
  const maxScrollTop = container.scrollHeight - container.clientHeight;
  if (container.scrollTop > maxScrollTop - 10) {
    container.scrollTop = 0;
  }
};

onMounted(async () => {
  await loadImages();
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  position: relative;
}

.image-item {
  width: calc(33.33% - 10px); /* Adjust for 3 images per row with gaps */
  box-sizing: border-box;
  height: 200px; /* Adjust based on image aspect ratio */
}
</style>
