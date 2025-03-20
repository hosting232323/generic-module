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
                :color="primaryColor"
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
                :color="primaryColor"
                class="mb-4"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" class="text-center">
              <v-btn
                class="full-width-btn mb-1 custom-btn"
                variant="elevated"
                :color="secondaryColor"
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
          <v-row v-if="showGoogleLogin">
            <v-col cols="12" md="12" class="text-center">
              <button class="gsi-material-button" @click="handleGoogleLogin">
                <div class="gsi-material-button-state"></div>
                <div class="gsi-material-button-content-wrapper">
                  <div class="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span class="gsi-material-button-contents">Accedi con Google</span>
                  <span style="display: none;">Accedi con Google</span>
                </div>
              </button>
            </v-col>
          </v-row>
          <v-row v-if="signUp">
            <v-col cols="12" md="12" class="text-center">
              <div class="d-flex justify-center align-center full-width-btn-group">
                <v-btn text @click="changeStatus(2)" class="custom-btn full-width-btn" :color="primaryColor">
                  Registrati qui
                </v-btn>
                <span class="ml-1 mr-1"></span>
                <v-btn text @click="changeStatus(3)" class="custom-btn full-width-btn" :color="primaryColor">
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
import { ref, onMounted, computed } from 'vue';
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
  },
  googleClientId: {
    type: String,
    default: ''
  }
});

const showGoogleLogin = computed(() => !!props.googleClientId);

const handleGoogleLogin = () => {
  google.accounts.id.initialize({
    client_id: props.googleClientId,
    callback: handleCredentialResponse,
  });

  google.accounts.id.prompt();
};

const handleCredentialResponse = (response) => {
  const jwt = response.credential;

  http.postRequest(
    `${props.hostname}google-login`,
    { token: jwt },
    (data) => {
      if (data.status === 'ok') {
          localStorage.setItem('token', data.token);
          if (data.user_info)
            for (const info of Object.keys(data.user_info))
              localStorage.setItem(`user_${info}`, data.user_info[info]);
          router.push(interpolatePath(props.redirectLink, data));
      } else {
        message.value = data.error;
      }
    }
  );
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
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
          localStorage.setItem('token', data.token);
          if (data.user_info)
            for (const info of Object.keys(data.user_info))
              localStorage.setItem(`user_${info}`, data.user_info[info]);
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
};

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

.gsi-material-button {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  appearance: none;
  -webkit-appearance: none;
  background-color: #f2f2f2;
  background-image: none;
  border: none;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
  max-width: 400px;
  min-width: min-content;
  margin: 0 auto;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
}

.gsi-material-button:disabled .gsi-material-button-state {
  background-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #001d35;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #001d35;
  opacity: 8%;
}
</style>