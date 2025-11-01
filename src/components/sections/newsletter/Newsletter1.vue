<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-icon size="64" color="primary" class="mb-4">mdi-email-outline</v-icon>
        <h2 class="text-h3 font-weight-bold mb-4">{{ getText(info?.title) }}</h2>
        <p class="text-h6 text-medium-emphasis mb-8">{{ getText(info?.subtitle) }}</p>
        <v-text-field v-model="email" :label="getText({ en: 'Your email', it: 'La tua email' })" variant="outlined" hide-details density="comfortable" class="newsletter-input">
          <template v-slot:append>
            <v-btn color="primary" variant="flat" size="large" @click="handleSubscribe">
              {{ getText({ en: 'Subscribe', it: 'Iscriviti' }) }}
            </v-btn>
          </template>
        </v-text-field>
        <p class="text-caption text-medium-emphasis mt-4">{{ getText(content?.disclaimer || { en: 'We respect your privacy', it: 'Rispettiamo la tua privacy' }) }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useLanguageStore } from '@/stores/language';

defineProps({
  content: Object,
  info: Object
});

const { getText } = useLanguageStore();

const email = ref('');

const handleSubscribe = () => {
  if (email.value) {
    email.value = '';
  }
};
</script>

<style scoped>
.newsletter-input {
  max-width: 600px;
  margin: 0 auto;
}
</style>
