<template>
  <div
    v-for="(social, index) in content"
    :key="index"
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      right: '20px',
      borderRadius: '100%',
      zIndex: 999,
      cursor: 'pointer',
      bottom: `${(props.chattyActive ? 100 : 20) + index * 70}px`,
      boxShadow: hoveredIndex === index
        ? '0px 10px 14px 0px rgba(0, 0, 0, 0.2)'
        : '0px 4px 4px 0px rgb(0 0 0 / 20%)',
      transition: 'box-shadow 225ms',
      backgroundColor: 'transparent'
    }"
    @mouseenter="hoveredIndex = index"
    @mouseleave="hoveredIndex = null"
  >
    <a :href="social.url" target="_blank" rel="noopener noreferrer">
      <v-btn
        :icon="social.icon"
        :style="{ backgroundColor: info.primaryColor, color: '#fff' }"
        size="x-large"
      />
    </a>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const props = defineProps({
  chattyActive: Boolean
});

const info = data.value.info;
const content = info.socialBubbles;

const hoveredIndex = ref(null);
</script>
