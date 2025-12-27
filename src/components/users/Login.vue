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
          <v-text-field
            label="Email"
            v-model="mail"
            type="email"
            prepend-icon="mdi-email"
            outlined
            class="mb-2"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="pass"
            prepend-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            outlined
            class="mb-4"
          />
          <v-btn
            class="mb-4"
            variant="elevated"
            :color="secondaryColor"
            type="submit"
            block
            :loading="loginLoading"
            text="Login"
          />
          <v-btn
            v-if="showGoogleLogin"
            class="mb-4 google-btn"
            variant="elevated"
            @click="handleGoogleLogin"
            height="40"
            block
            :loading="googleLoading"
          >
            <div class="google-icon-wrapper">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                alt="Google logo"
                class="google-icon"
              />
            </div>
            <span class="google-btn-text">Accedi con Google</span>
          </v-btn>
          <v-row v-if="signUp" no-gutters>
            <v-col cols="12" md="5">
              <v-btn
                text="Registrati qui"
                @click="emits('changeStatus', 2)"
                :color="primaryColor"
                block
                class="mb-4"
              />
            </v-col>
            <v-spacer />
            <v-col cols="12" md="5">
              <v-btn
                text="Reset password"
                @click="emits('changeStatus', 3)"
                :color="primaryColor"
                block
                class="mb-4"
              />
            </v-col>
          </v-row>
          <v-alert v-if="message" type="error" dense>
            {{ message }}
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import http from '@/utils/http';
import { ref, onMounted, computed } from 'vue';
import { encryptPassword } from '@/utils/encrypt';

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
    required: false
  },
  secondaryColor: {
    type: String,
    required: false
  },
  redirectLink: {
    type: String,
    required: true
  },
  signUp: {
    type: Boolean,
    default: true
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
  },
  googleClientId: {
    type: String,
    default: ''
  }
});

const mail = ref('');
const pass = ref('');
const message = ref('');
const showPassword = ref(false);
const loginLoading = ref(false);
const googleLoading = ref(false);
const emits = defineEmits(['callBack', 'changeStatus']);
const showGoogleLogin = computed(() => !!props.googleClientId);

const handleGoogleLogin = () => {
  googleLoading.value = true;
  google.accounts.id.initialize({
    client_id: props.googleClientId,
    callback: (response) => {
      handleCredentialResponse(response);
      googleLoading.value = false;
    }
  });
  google.accounts.id.prompt();
};

const handleCredentialResponse = (response) => {
  http.postRequest('user/google-login', {
    token: response.credential
  }, (data) => {
    if (data.status === 'ok')
      emits('callBack', data);
    else
      message.value = data.error;
  }, 'POST', undefined, props.hostname);
};

const login = () => {
  if (mail.value && pass.value) {
    message.value = '';
    loginLoading.value = true;
    http.postRequest('user/login', {
      email: mail.value,
      password: encryptPassword(pass.value, props.secretKey, props.iv)
    }, function (data) {
      loginLoading.value = false;
      if (data.status === 'ok')
        emits('callBack', data);
      else
        message.value = data.error;
    }, 'POST', undefined, props.hostname);
  }
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
});
</script>

<style scoped>
.button-container {
  width: 100%;
  max-width: 300px;
}

.google-btn {
  background-color: white !important;
  border: 1px solid #ddd !important;
}

.google-icon-wrapper {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.google-icon {
  width: 18px;
  height: 18px;
}

.google-btn-text {
  color: #757575;
}

.google-btn:hover {
  box-shadow: 0 0 3px 3px rgba(66,133,244,.3) !important;
}

.google-btn:active {
  background-color: #eee !important;
}
</style>
