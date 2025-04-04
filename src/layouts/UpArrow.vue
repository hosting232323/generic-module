<template>
  <div @click="scrollToTop" :style="supContainerStyle">
    <span class="mdi mdi-arrow-up-thin" :style="upArrowStyle"></span>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref } from 'vue';

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
});

const info = computed(() => props.info);
const isVisible = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const handleScroll = () => {
  isVisible.value = window.scrollY >= 250;
  console.log(supContainerStyle.value.visibility);
  if (isVisible.value) supContainerStyle.value.visibility = 'visible !important';
  if (!isVisible.value) supContainerStyle.value.visibility = 'hidden !important';
  console.log(supContainerStyle.value.visibility);
};

onMounted(() => {
  console.log("onMounted: Aggiungo evento scroll");
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Controlla lo stato iniziale
});

onUnmounted(() => {
  console.log("onUnmounted: Rimuovo evento scroll");
  window.removeEventListener('scroll', handleScroll);
});

const supContainerStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '40px',
  height: '40px',
  backgroundColor: 'rgba(238, 238, 238, 0.8)',
  borderRadius: '100%',
  zIndex: '999',
  cursor: 'pointer',
  boxShadow: isVisible.value ? '0px 10px 14px 0px rgba(0, 0, 0, 0.2)' : '0px 4px 4px 0px rgb(0 0 0 / 20%)',
  transition: 'box-shadow 225ms',
  visibility: 'hidden'
}));

const upArrowStyle = computed(() => ({
  fontSize: '25px',
  color: info.value.primaryColor
}));
</script>
