<template>
  <div class="cookie-settings">
    <v-btn
      :variant="variant"
      :size="size"
      :append-icon="showIcon ? 'mdi-cookie' : undefined"
      :disabled="!isKlaroAvailable"
      class="cookie-settings-btn"
      @click="openCookieSettings"
    >
      {{ buttonText }}
    </v-btn>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const { buttonText, variant, size, showIcon } = defineProps({
  buttonText: {
    type: String,
    default: 'Impostazioni Cookie',
  },
  variant: {
    type: String,
    default: 'outlined',
    validator: (value) =>
      ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'].includes(
        value
      ),
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['x-small', 'small', 'default', 'large', 'x-large'].includes(value),
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['before-open', 'after-open', 'error']);
const klaro = inject('klaro', null);
const isKlaroAvailable = computed(() => {
  return typeof window !== 'undefined' && (klaro || window.klaro);
});

const openCookieSettings = () => {
  try {
    emit('before-open');

    if (typeof window !== 'undefined') {
      const klaroInstance = klaro || window.klaro;

      if (klaroInstance) {
        klaroInstance.show();
        emit('after-open');
      } else {
        emit('error', 'Klaro non è disponibile');
      }
    }
  } catch (error) {
    emit('error', error);
  }
};

defineExpose({
  openCookieSettings,
  isKlaroAvailable,
});
</script>

<style scoped>
.cookie-settings {
  display: inline-block;
}

.cookie-settings-btn {
  transition: all 0.3s ease;
  color: #42b983 !important;
}

.cookie-settings-btn :deep(.v-btn__content) {
  color: #42b983 !important;
  font-size: 16px;
  text-transform: capitalize;
  text-decoration: underline;
}

.cookie-settings-btn :deep(.v-icon) {
  color: #42b983 !important;
}

.cookie-settings-btn :deep(.v-icon) {
  font-size: 24px;
}

.cookie-settings-btn.v-btn--size-small {
  padding: 0 !important;
  min-width: auto !important;
  height: auto !important;
  font-size: 14px !important;
}
</style>
