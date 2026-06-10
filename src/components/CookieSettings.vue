<template>
  <div class="cookie-settings">
    <v-btn
      :variant="variant"
      :size="size"
      :color="color"
      :prepend-icon="showIcon ? 'mdi-cookie' : undefined"
      @click="openCookieSettings"
    >
      {{ buttonText }}
    </v-btn>
  </div>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    default: 'Impostazioni Cookie',
  },
  variant: {
    type: String,
    default: 'outlined',
  },
  size: {
    type: String,
    default: 'default',
  },
  color: {
    type: String,
    default: 'primary',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const openCookieSettings = () => {
  if (typeof window !== 'undefined' && window.klaro) {
    window.klaro.show();
  } else {
    // eslint-disable-next-line no-console
    console.warn('Klaro non è disponibile');
  }
};
</script>

<style scoped>
.cookie-settings {
  display: inline-block;
}
</style>
