<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card :elevation="20" width="500" class="pa-5">
      <v-img
        :src="logo"
        max-width="100"
        class="mx-auto mb-4"
        alt="Logo"
      />
      <v-card-title class="text-h5 text-center mb-6">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registerUser">
          <v-text-field
            label="Nome"
            v-model="name"
            outlined
            class="mb-2"
          />
          <v-text-field
            label="Email"
            v-model="mail"
            type="email"
            outlined
            class="mb-4"
          />
          <v-btn
            block
            variant="elevated"
            :color="secondaryColor"
            type="submit"
            class="mb-4"
            :loading="loading"
            text="Registrati"
          />
          <v-row>
            <v-col cols="12" md="5" no-gutters>
              <div class="d-flex justify-start align-center">
                <v-btn 
                  @click="emits('changeStatus', 1)" 
                  :color="primaryColor"
                  class="mb-4"
                  block
                  text="Torna al login"
                />
              </div>
            </v-col>
          </v-row>
          <v-alert v-if="message" :type="messageType" dense>
            {{ message }}
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import http from '@/utils/http';
import validation from '@/utils/validation';

const props = defineProps({
  logo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  primaryColor: {
    type: String,
    required: true
  },
  secondaryColor: {
    type: String,
    required: true
  },
  redirectLink: {
    type: String,
    required: true
  },
  hostname: {
    type: String,
    required: true
  }
});

const mail = ref('');
const name = ref('');
const message = ref('');
const loading = ref(false);
const messageType = ref('error');
const emits = defineEmits(['changeStatus']);

const registerUser = () => {
  if (
    !validation.validateInput(mail.value, validation.emailRules) &&
    !validation.validateInput(name.value, validation.requiredRules)
  ) {
    message.value = '';
    loading.value = true;
    http.postRequest('register-user', {
      name: name.value,
      email: mail.value,
    }, function (data) {
      loading.value = false;
      if (data.status === 'ok') {
        messageType.value = 'success';
        message.value = data.message;
      } else {
        messageType.value = 'error';
        message.value = data.error;
      }
    }, 'POST', undefined, props.hostname);
  }
};
</script>
