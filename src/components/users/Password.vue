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
        <v-form @submit.prevent="changePassword">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Password"
                v-model="pass"
                :rules="validation.passwordRules"
                type="password"
                outlined
                class="mb-4"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Conferma password"
                v-model="confirmPass"
                :rules="validation.passwordRules"
                type="password"
                outlined
                class="mb-4"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn
                block
                variant="elevated"
                :color="secondaryColor"
                type="submit"
                class="mb-4 custom-btn"
                :loading="loading"
              >
                Invia
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <div class="d-flex justify-start align-center">
                <v-btn 
                  text @click="goToLogin" 
                  :color="primaryColor"
                  class="custom-btn full-width-btn"
                >
                  Torna al login
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="message">
            <v-col cols="12">
              <v-alert :type="messageType" dense>{{ message }}</v-alert>
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
import encrypt from '@/utils/encrypt';
import validation from '@/utils/validation';
import { useRouter, useRoute } from 'vue-router';

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
    secretKey: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  hostname: {
    type: String,
    required: true
  }
});

const pass = ref('');
const message = ref('');
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const confirmPass = ref('');
const messageType = ref('error');

const goToLogin = () => {
  router.push(props.redirectLink);
};

const changePassword = () => {
  if (
    !validation.validateInput(pass.value, validation.passwordRules) &&
    !validation.validateInput(confirmPass.value, validation.passwordRules)
  ) {
    if (pass.value !== confirmPass.value) {
      messageType.value = 'error';
      message.value = 'Le password non coincidono';
    } else {
      message.value = '';
      loading.value = true;
      http.postRequest('change-password', {
        pass_token: route.params.token,
        new_password: encrypt.encryptPassword(pass.value, props.secretKey, props.iv)
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
