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
            <v-col cols="12" md="12" class="d-flex justify-center">
              <v-btn
                class="mb-4 mx-auto"
                variant="elevated"
                :color="secondaryColor"
                type="submit"
                block
                :loading="loginLoading"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="showGoogleLogin">
            <v-col cols="12" md="12" class="d-flex justify-center">
              <v-btn
                class="mb-4 mx-auto google-btn"
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
            </v-col>
          </v-row>
          <v-row v-if="signUp">
            <v-col cols="12" md="6">
              <v-btn
                text="Registrati qui"
                @click="changeStatus(2)"
                :color="primaryColor"
                block
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                text="Reset password"
                @click="changeStatus(3)"
                :color="primaryColor"
                block
              />
            </v-col>
          </v-row>
          <v-row v-if="message">
            <v-col cols="12" md="12">
              <v-alert type="error" dense>{{ message }}</v-alert>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import http from '@/utils/http';
import encrypt from '@/utils/encrypt';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

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

const loginLoading = ref(false);
const googleLoading = ref(false);
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
  const jwt = response.credential;

  http.postRequest('google-login', {
    token: jwt
  }, (data) => {
    if (data.status === 'ok') {
      localStorage.setItem('token', data.token);
      if (data.user_info)
        for (const info of Object.keys(data.user_info))
          localStorage.setItem(`user_${info}`, data.user_info[info]);
      router.push(interpolatePath(props.redirectLink, data));
    } else
      message.value = data.error;
  }, 'POST', undefined, props.hostname);
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
const router = useRouter();
const showPassword = ref(false);
const emits = defineEmits(['changeStatus']);

const login = () => {
  if (mail.value && pass.value) {
    message.value = '';
    loginLoading.value = true;
    http.postRequest('login', {
      email: mail.value,
      password: encrypt.encryptPassword(pass.value, props.secretKey, props.iv)
    }, function (data) {
      loginLoading.value = false;
      if (data.status === 'ok') {
        localStorage.setItem('token', data.token);
        if (data.user_info)
          for (const info of Object.keys(data.user_info))
            localStorage.setItem(`user_${info}`, data.user_info[info]);
        router.push(interpolatePath(props.redirectLink, data));
      } else {
        message.value = data.error;
      }
    }, 'POST', undefined, props.hostname);
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
