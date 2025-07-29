<template>
  <v-alert
    v-if="showAlert"
    :type="alertType"
    transition="scale-transition"
    class="popupResponse"
    v-html="alertMessage"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePopupStore } from '@/stores/popup';

const responseStore = usePopupStore();
const { message, type } = storeToRefs(responseStore);

const showAlert = ref(false);

const alertType = computed(() => {
  const allowedTypes = ['success', 'info', 'warning', 'error'];
  return allowedTypes.includes(type.value) ? type.value : 'info';
});
const alertMessage = computed(() => message.value);

watch(message, (newValue) => {
  if (newValue) {
    showAlert.value = true;

    setTimeout(() => {
      showAlert.value = false;
    }, 1500);
  }
});
</script>

<style scoped>
.popupResponse {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  user-select: none;
  z-index: 99999;
}
</style>
