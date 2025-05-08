<template>
  <v-carousel v-if="content.type === 'manual'" :id="id" :height="isMobile ? 400 : 600" delimiter-icon="mdi-square">
    <v-carousel-item v-for="(slide, index) in content.images" :key="index">
      <v-img :src="resolveImg(slide)" cover />
    </v-carousel-item>
  </v-carousel>
  <v-carousel v-if="content.type === 'automatic'" :id="id" style="height: 96vh;" @click="resetTimer" v-model="selected" hide-delimiters>
        <v-carousel-item v-for="img in content.images" :src="resolveImg(img)" cover />
        <template #prev></template>
        <template #next></template>
        <v-row align="end" justify="end">
            <div>
                <div v-if="!isMobile" class="caption">
                    {{ content.images[selected].caption }}
                </div>
                <div v-else class="caption-mobile">
                    {{ content.images[selected].caption }}
                </div>
            </div>
            <div class="custom-controls">
                <div v-for="(_img, index) in content.images">
                    <div :class="['mx-1', 'my-3', 'custom-dot', { 'custom-dot--active': selected == index }]"
                        @click="selected = index"
                        :style="selected === index ? { backgroundColor: info.primaryColor } : {}"
                    ></div>
                </div>
            </div>
        </v-row>
    </v-carousel>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useMobileUtils } from '@/utils/mobile';

const { isMobile, resolveImg } = useMobileUtils();
const { id, content, info } = defineProps(['id', 'content', 'info']);

console.log(id);

const selected = ref(0);
const intervalId = ref(null);

const prev = () => {
  selected.value = (selected.value + content.images.length - 1) % content.images.length;
};

const next = () => {
  selected.value = (selected.value + 1) % content.images.length;
};

const startTimer = () => {
  intervalId.value = setInterval(() => {
    next();
  }, 5000);
};

const resetTimer = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  } else
    startTimer();
};

const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prev();
    resetTimer();
  } else if (event.key === 'ArrowRight') {
    next();
    resetTimer();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  startTimer();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  clearInterval(intervalId.value);
});
</script>

<style scoped>
.caption {
  position: absolute;
  bottom: 25px;
  left: 15px;
  color: white;
  font-size: larger;
}

.caption-mobile {
  position: absolute;
  bottom: 60px;
  right: 25px;
  text-align: right;
  color: white;
  font-size: larger;
}

.custom-controls {
  position: absolute;
  bottom: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
}
</style>
