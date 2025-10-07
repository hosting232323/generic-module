<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card
      :elevation="20"
      width="500"
      class="pa-5"
    >
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
        <v-form @submit.prevent="askChangePassword">
          <v-text-field
            v-model="mail"
            label="Email"
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
            text="Invia mail"
            :loading="loading"
          />
          <v-row>
            <v-col
              cols="12"
              md="5"
              no-gutters
            >
              <v-btn
                :color="primaryColor"
                class="mb-4"
                text="Torna al login"
                block
                @click="changeStatus(1)"
              />
            </v-col>
          </v-row>
          <v-alert
            v-if="message"
            :type="messageType"
            dense
          >
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
const message = ref('');
const loading = ref(false);
const messageType = ref('error');
const emits = defineEmits(['changeStatus']);

const changeStatus = (value) => {
  emits('changeStatus', value);
};

const askChangePassword = () => {
  if (!validation.validateInput(mail.value, validation.emailRules)) {
    message.value = '';
    loading.value = true;
    http.postRequest('ask-change-password', {
      email: mail.value,
    },
    function (data) {
      loading.value = false;
      if (data.status == 'ok') {
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
