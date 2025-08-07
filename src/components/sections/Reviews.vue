<template>
  <v-container>
    <v-row class="mt-9 justify-center" dense style="max-height: max-content;">
      <v-col v-for="(review, index) in content.reviews" :key="index" cols="12" sm="6" md="4">
        <div class="review pa-4">
          <img src="/google.png" alt="logo google" style="height: 28px; margin-bottom: 5px;">
          <p>{{ review.descrizione }}</p>
          <div class="dotted-line-big" :style="{
            backgroundImage: `radial-gradient(${info.primaryColor} 1px, transparent 2px)`
          }"></div>
          <p>{{ review.nome }}</p>
        </div>
      </v-col>
      <div class="controls-with-indicators">
        <v-btn icon @click="prevReview" variant="text" class="nav-arrow">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <div class="indicator-container">
          <span v-for="(r, i) in content.reviews" :key="i" :class="['dot', { active: currentIndex === i }]"
            :style="currentIndex === i ? { backgroundColor: info.primaryColor } : {}" @click="currentIndex = i" />
        </div>

        <v-btn icon @click="nextReview" variant="text" class="nav-arrow">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-row>
    <!-- <div>
        <transition-group name="fade" tag="div">
          <div
            v-for="(review, index) in [content.reviews[currentIndex]]"
            :key="index"
            class="review mt-4"
          >
            <p class="description" style="margin: 0 !important;">{{ review.descrizione }}</p>
            <div class="dotted-line-big"></div>
            <p class="description name" style="margin: 0 !important;">{{ review.nome }}</p>
          </div>
        </transition-group>

        <div class="controls-with-indicators">
          <v-btn icon @click="prevReview" variant="text" class="nav-arrow" color="white">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <div class="indicator-container">
            <span
              v-for="(r, i) in reviews"
              :key="i"
              :class="['dot', { active: currentIndex === i }]"
              @click="currentIndex = i"
            />
          </div>

          <v-btn icon @click="nextReview" variant="text" class="nav-arrow" color="white">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div> -->
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { setupMobileUtils, resolveImg } from '@/utils/mobile';
const { content, info } = defineProps(['content', 'info']);

const currentIndex = ref(0);
let intervalId;

const startInterval = () => {
  intervalId = setInterval(nextReview, 4000);
};

const resetInterval = () => {
  clearInterval(intervalId);
  startInterval();
};


const nextReview = () => {
  currentIndex.value = (currentIndex.value + 1) % content.reviews.length;
  resetInterval();
};

const prevReview = () => {
  currentIndex.value = (currentIndex.value - 1 + content.reviews.length) % content.reviews.length;
  resetInterval();
};

onMounted(() => {
  startInterval();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.dotted-line-big {
  height: 8px;
  background-size: 7px 7px;
  background-repeat: repeat-x;
  margin: 15px 0;
}

.controls-with-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.indicator-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #bbb;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
