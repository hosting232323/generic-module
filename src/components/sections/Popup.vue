<template>
    <v-alert
      v-if="showAlert"
      :type="alertType"
      transition="scale-transition"
      class="popupResponse"
    >
    {{ alertMessage }}
    </v-alert>
  </template>
  
<script setup>
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePopupStore } from '@/stores/popup';

const responseStore = usePopupStore();
const { message, type } = storeToRefs(responseStore);

const showAlert = ref(false);

const alertType = computed(() => {
    return type.value;
});
const alertMessage = computed(() => {
    return message.value;
});

watch(message, (newValue) => {
  if (newValue) {
    showAlert.value = true;

    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
});
</script>



<style scoped>
.popupResponse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  user-select: none;
  z-index: 999;
}
</style>
