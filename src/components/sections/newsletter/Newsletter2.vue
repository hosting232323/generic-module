<template>
  <v-container fluid class="newsletter-container">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <h2 class="text-h3 font-weight-bold text-white mb-4">{{ getText(info?.title) }}</h2>
          <p class="text-h6 text-white mb-6">{{ getText(info?.subtitle) }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="8">
            <v-card-text class="pa-6">
              <v-text-field v-model="email" :label="getText({ en: 'Email address', it: 'Indirizzo email' })" variant="outlined" prepend-inner-icon="mdi-email" hide-details class="mb-4"></v-text-field>
              <v-btn color="primary" variant="flat" block size="large" @click="handleSubscribe">
                {{ getText({ en: 'Get Started', it: 'Inizia' }) }}
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
              <p class="text-caption text-center text-medium-emphasis mt-4">{{ getText(content?.disclaimer || { en: 'No spam, unsubscribe anytime', it: 'Niente spam, cancellati quando vuoi' }) }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
.newsletter-container {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  padding: 80px 0;
}
</style>
