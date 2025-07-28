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
        <v-form @submit.prevent="askChangePassword">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Email"
                v-model="mail"
                type="email"
                outlined
                class="mb-4"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" class="text-center">
              <v-btn
                block
                variant="elevated"
                :style="{'background-color': secondaryColor}"
                type="submit"
                class="mb-4 custom-btn"
              >
                Invia mail
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="message">
            <v-col cols="12" md="12">
              <v-alert :type="messageType" dense>{{ message }}</v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <div class="d-flex justify-start align-center">
                <v-btn
                  text @click="changeStatus(1)"
                  :style="{'background-color': primaryColor}"
                  class="custom-btn full-width-btn"
                >
                  Torna al login
                </v-btn>
              </div>
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

const props = defineProps({
  logo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  primaryColor: {
    type: String,
    required: true,
  },
  secondaryColor: {
    type: String,
    required: true,
  },
  redirectLink: {
    type: String,
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
});

const mail = ref('');
const message = ref('');
const messageType = ref('error');
const emits = defineEmits(['changeStatus']);

const changeStatus = (value) => {
  emits('changeStatus', value);
};

const askChangePassword = () => {
  if (!validation.validateInput(mail.value, validation.emailRules)) {
    message.value = '';
    http.postRequest('ask-change-password',
      {
        email: mail.value,
      },
      function (data) {
        if (data.status == 'ok') {
          messageType.value = 'success';
          message.value = data.message;
        } else {
          messageType.value = 'error';
          message.value = data.error;
        }
      }, 'POST', undefined, props.hostname
    );
  }
};
</script>

<style scoped>
.custom-btn {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 16px;
  min-height: 48px;
  line-height: 1.5;
}
</style>
