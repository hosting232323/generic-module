<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="newsletter-card" elevation="4">
          <v-card-text class="pa-8">
            <div class="text-center mb-6">
              <v-avatar color="primary" size="80" class="mb-4">
                <v-icon size="48" color="white">mdi-bell-ring</v-icon>
              </v-avatar>
              <h2 class="text-h4 font-weight-bold mb-3">{{ getText(info?.title) }}</h2>
              <p class="text-body-1 text-medium-emphasis">{{ getText(info?.subtitle) }}</p>
            </div>
            <v-form @submit.prevent="handleSubscribe">
              <v-text-field v-model="name" :label="getText({ en: 'Name', it: 'Nome' })" variant="solo" flat hide-details class="mb-3"></v-text-field>
              <v-text-field v-model="email" :label="getText({ en: 'Email', it: 'Email' })" variant="solo" flat hide-details class="mb-4"></v-text-field>
              <v-btn color="primary" variant="flat" block size="x-large" type="submit">
                {{ getText({ en: 'Join Now', it: 'Unisciti Ora' }) }}
                <v-icon end>mdi-send</v-icon>
              </v-btn>
            </v-form>
            <div class="text-center mt-6">
              <v-chip size="small" variant="outlined" class="ma-1">
                <v-icon start size="small">mdi-check</v-icon>
                {{ getText({ en: 'Free', it: 'Gratuito' }) }}
              </v-chip>
              <v-chip size="small" variant="outlined" class="ma-1">
                <v-icon start size="small">mdi-check</v-icon>
                {{ getText({ en: 'No spam', it: 'Niente spam' }) }}
              </v-chip>
              <v-chip size="small" variant="outlined" class="ma-1">
                <v-icon start size="small">mdi-check</v-icon>
                {{ getText({ en: 'Unsubscribe anytime', it: 'Cancellati quando vuoi' }) }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
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

const name = ref('');
const email = ref('');

const handleSubscribe = () => {
  if (name.value && email.value) {
    name.value = '';
    email.value = '';
  }
};
</script>

<style scoped>
.newsletter-card {
  border-top: 4px solid rgb(var(--v-theme-primary));
}
</style>
