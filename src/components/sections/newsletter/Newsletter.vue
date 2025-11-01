<template>
  <v-container>
    <v-card elevation="20" :color="info.primaryColor" dark class="newsletter-card">
      <v-card-text class="text-center pa-8">
        <h2 class="text-h4 mb-4" v-html="getText(content.title) || 'Iscriviti alla newsletter'"/>
        <p class="text-subtitle-1 mb-6" v-html="getText(content.description) || 'Rimani aggiornato sulle ultime novità'"/>
        <v-form @submit.prevent="subscribe" class="newsletter-form">
          <v-row justify="center" align="center">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                :rules="validation.emailRules"
                variant="outlined"
                label="Email"
                bg-color="white"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                type="submit"
                size="large"
                block
                variant="flat"
                color="white"
                :style="{ color: info.primaryColor }"
                v-html="getText(content.button) || 'Iscriviti'"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import http from '@/utils/http';
import validation from '@/utils/validation';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const email = ref('');

const subscribe = () => {
  if (!validation.validateInput(email.value, validation.emailRules)) {
    http.postRequest('subscribe-newsletter', {
      email: email.value,
      source: info.name
    }, function () {
      alert("Iscrizione completata!");
      email.value = '';
    });
  }
};
</script>

<style scoped>
.newsletter-card {
  border-radius: 15px;
}
.newsletter-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
