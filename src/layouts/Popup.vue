<template>
    <v-alert
      v-model="visible"
      :type="type"
      transition="scale-transition"
      class="popupResponse"
    >
      {{ content }}
    </v-alert>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue';

const props = defineProps({
    initialVisible: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'success',
    },
    duration: {
        type: Number,
        default: 2000,
    },
});

const { initialVisible } = toRefs(props);
const visible = ref(initialVisible.value);

watch(visible, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            visible.value = false;
        }, props.duration);
    }
});

watch(initialVisible, (newVal) => {
    visible.value = newVal;
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
