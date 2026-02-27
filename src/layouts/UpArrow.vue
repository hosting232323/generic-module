<template>
  <div
    ref="topButton"
    class="sup-container shadown"
    :style="{ bottom: `${props.bottomOffset}px` }"
    @click="scrollToTop"
  >
    <i
      id="UpArrow"
      class="fas fa-arrow-up"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const props = defineProps({
  bottomOffset: {
    type: Number,
    default: 20
  }
});

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;

const topButton = ref(null);
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
const handleScroll = () => {
  if (window.scrollY >= 250)
    topButton.value.classList.add('visible');
  else
    topButton.value.classList.remove('visible');
};

onMounted(() => {
  const upArrow = document.getElementById('UpArrow');
  if (upArrow) upArrow.style.color = info.primaryColor;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.sup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  position: fixed;
  right: 15px;
  width: 40px;
  height: 40px;
  background-color: rgba(238, 238, 238, 0.8);
  border-radius: 100%;
  z-index: 999;
  cursor: pointer;
}

.visible {
  visibility: visible;
}

.shadown {
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 20%);
  transition: box-shadow 225ms;
}

.shadown:hover {
  box-shadow: 0px 10px 14px 0px rgba(0, 0, 0, 0.2);
}
</style>
