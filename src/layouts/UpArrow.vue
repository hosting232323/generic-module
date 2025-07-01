<template>
  <div
    :style="{
      bottom: `${props.bottomOffset}px`,
      display: isVisible ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      right: '20px',
      width: '40px',
      height: '40px',
      backgroundColor: 'rgba(238, 238, 238, 0.8)',
      borderRadius: '100%',
      zIndex: 999,
      cursor: 'pointer',
      boxShadow: isHovered ? '0px 10px 14px 0px rgba(0, 0, 0, 0.2)' : '0px 4px 4px 0px rgb(0 0 0 / 20%)',
      transition: 'box-shadow 225ms'
    }"
    @click="scrollToTop"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <i class="fas fa-arrow-up" id="UpArrow" :style="{ color: info.primaryColor }" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
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

const isVisible = ref(false);
const isHovered = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  isVisible.value = window.scrollY >= 250;
};

window.addEventListener('scroll', handleScroll);
</script>
