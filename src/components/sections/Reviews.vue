<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Ciò che dicono di noi'"/>
    <v-row class="mt-9 justify-center" dense>
      <transition-group name="fade" tag="div" class="d-flex flex-wrap justify-center" style="width: 100%; position: relative;">
        <v-col
          v-for="(review, index) in visibleReviews"
          :key="review.name + '-' + index"
          :cols="reviewsPerPage === 1 ? 12 : (reviewsPerPage === 2 ? 6 : 4)"
        >
          <div class="review pa-4">
            <div class="d-flex align-center" style="margin-bottom: 15px;">
              <v-avatar size="35" class="mr-3">
                <canvas 
                  ref="canvasRefs"
                  :data-name="review.name"
                  width="40"
                  height="40"
                ></canvas>
              </v-avatar>
              <p class="d-flex align-center justify-center">
                {{ review.name }}
                <span class="ml-2 d-flex align-center justify-center">
                  <v-icon
                    v-for="i in 5"
                    :key="i"
                    size="18"
                    :color="i <= review.stars ? info.primaryColor : 'grey'"
                  >
                    mdi-star
                  </v-icon>
                </span>
                </p>
            </div>
            <p>{{ review.descrizione }}</p>
            <div class="dotted-line-big" :style="{ backgroundImage: `radial-gradient(${info.primaryColor} 1px, transparent 2px)` }"></div>
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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { useLanguageStore } from '@/stores/language'

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info'])
const canvasRefs = ref([]) // array gestito da Vue
const currentGroupIndex = ref(0)
let intervalId

const { smAndDown, mdAndDown } = useDisplay();

// Funzione hash per colore coerente
const hashColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#16A085', '#E74C3C'];
  return colors[Math.abs(hash) % colors.length];
};

// Generazione avatar
const generateProfileImage = (canvas, name) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const bgColor = hashColor(name);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 40, 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), 20, 22);
};

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
  currentGroupIndex.value = (currentGroupIndex.value + 1) % totalGroups.value;
  resetInterval();
}

const prevReview = () => {
  currentGroupIndex.value = (currentGroupIndex.value - 1 + totalGroups.value) % totalGroups.value;
  resetInterval();
}

const setGroup = (index) => {
  currentGroupIndex.value = index;
  resetInterval();
}

const startInterval = () => {
  if (totalGroups.value > 1) {
    intervalId = setInterval(nextReview, 4000);
  }
}

const resetInterval = () => {
  clearInterval(intervalId);
  startInterval();
}

const drawAllAvatars = async () => {
  await nextTick()
  canvasRefs.value.forEach(canvas => {
    if (canvas) {
      generateProfileImage(canvas, canvas.dataset.name)
    }
  })
}

onMounted(() => {
  startInterval();
  drawAllAvatars();
});

watch(visibleReviews, () => {
  drawAllAvatars()
})

onBeforeUnmount(() => {
  clearInterval(intervalId);
})

watch(reviewsPerPage, () => {
  if (currentGroupIndex.value >= totalGroups.value) {
    currentGroupIndex.value = 0;
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
