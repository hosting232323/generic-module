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
        <v-form @submit.prevent="login">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Email"
                v-model="mail"
                type="email"
                prepend-icon="mdi-email"
                outlined
                class="mb-2"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                v-model="pass"
                prepend-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
                outlined
                class="mb-4"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" class="text-center">
              <v-btn
                class="full-width-btn mb-1 custom-btn"
                variant="elevated"
                :style="{'background-color': secondaryColor}"
                type="submit"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="message">
            <v-col cols="12" md="12">
              <v-alert type="error" dense>{{ message }}</v-alert>
            </v-col>
          </v-row>
          <v-row v-if="signUp">
            <v-col cols="12" md="12" class="text-center">
              <div class="d-flex justify-center align-center full-width-btn-group">
                <v-btn 
                  text @click="changeStatus(2)" 
                  class="custom-btn full-width-btn" 
                  :style="{'background-color': primaryColor}"
                >
              Registrati qui
              </v-btn>
                <span class="ml-1 mr-1"></span>
                <v-btn 
                  text @click="changeStatus(3)" 
                  class="custom-btn full-width-btn" 
                  :style="{'background-color': primaryColor}"
                >
              Reset password
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
import { SHA256 } from 'crypto-js';
import { useRouter } from 'vue-router';

const props = defineProps({
  logo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  signinTitle: {
    type: String
  },
  changePasswordTitle: {
    type: String
  },
  newPasswordTitle: {
    type: String
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
  signUp: {
    type: Boolean,
    default: true
  },
  hostname: {
    type: String,
    required: true
  }
});

const mail = ref('');
const pass = ref('');
const message = ref('');
const showPassword = ref(false);
const router = useRouter();
const emits = defineEmits(['changeStatus']);

const login = () => {
  if (mail.value && pass.value) {
    message.value = '';
    http.postRequest(
      `${props.hostname}login`,
      {
        email: mail.value,
        password: props.signUp ? SHA256(pass.value).toString() : pass.value,
      },
      function (data) {
        if (data.status === 'ok') {
          localStorage.setItem('strongbox_session_token', data.session_token);
          router.push(interpolatePath(props.redirectLink, data));
        } else {
          message.value = data.error;
        }
      }
    );
  }
};

const interpolatePath = (path, data) => {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (match, paramName) => {
    if (paramName in data)
      return data[paramName];
    return match;
  });
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const changeStatus = (value) => {
  emits('changeStatus', value);
};
</script>

<style scoped>
.full-width-btn {
  width: 100%;
}

.full-width-btn-group > * {
  flex: 1;
}

.custom-btn {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 16px;
  min-height: 48px;
  line-height: 1.5;
}
</style>
