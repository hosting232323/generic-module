<template>
  <v-container>
    <v-row class="mt-9 justify-center" dense style="max-height: max-content;">
      <transition-group name="fade" tag="div" class="d-flex flex-wrap justify-center" style="width: 100%; position: relative;">
        <v-col
          v-for="(review, index) in visibleReviews"
          :key="review.nome + index"
          cols="12"
          sm="6"
          md="4"
        >
          <div class="review pa-4">
            <img src="/google.png" alt="logo google" style="height: 28px; margin-bottom: 5px;">
            <p>{{ review.descrizione }}</p>
            <div
              class="dotted-line-big"
              :style="{
                backgroundImage: `radial-gradient(${info.primaryColor} 1px, transparent 2px)`
              }"
            ></div>
            <p>{{ review.nome }}</p>
          </div>
        </v-col>
      </transition-group>
    </v-row>

    <div v-if="totalGroups > 1" class="controls-with-indicators mt-4">
      <v-btn icon @click="prevReview" variant="text" class="nav-arrow">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <div class="indicator-container">
        <span
          v-for="(group, i) in totalGroups"
          :key="i"
          :class="['dot', { active: currentGroupIndex === i }]"
          :style="currentGroupIndex === i ? { backgroundColor: info.primaryColor } : {}"
          @click="setGroup(i)"
        />
      </div>

      <v-btn icon @click="nextReview" variant="text" class="nav-arrow">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { content, info } = defineProps(['content', 'info'])

const currentGroupIndex = ref(0)
let intervalId

const { smAndDown, mdAndDown } = useDisplay()

const reviewsPerPage = computed(() => {
  if (smAndDown.value) return 1
  if (mdAndDown.value) return 2
  return 3
})

const totalGroups = computed(() => {
  return Math.ceil(content.reviews.length / reviewsPerPage.value)
})

const visibleReviews = computed(() => {
  const start = currentGroupIndex.value * reviewsPerPage.value
  return content.reviews.slice(start, start + reviewsPerPage.value)
})

const nextReview = () => {
  currentGroupIndex.value = (currentGroupIndex.value + 1) % totalGroups.value
  resetInterval()
}

const prevReview = () => {
  currentGroupIndex.value = (currentGroupIndex.value - 1 + totalGroups.value) % totalGroups.value
  resetInterval()
}

const setGroup = (index) => {
  currentGroupIndex.value = index
  resetInterval()
}

const startInterval = () => {
  intervalId = setInterval(nextReview, 4000)
}

const resetInterval = () => {
  clearInterval(intervalId)
  startInterval()
}

onMounted(() => {
  startInterval()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

watch(reviewsPerPage, () => {
  if (currentGroupIndex.value >= totalGroups.value) {
    currentGroupIndex.value = 0
  }
})
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

.dot.active {
  background-color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: relative;
  display: flex;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
  width: 100%;
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  width: 100%;
}

.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  width: 100%;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
  width: 100%;
}
</style>
