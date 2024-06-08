<template>
  <v-container class="login__container">
    <v-card elevation="20" title="Login" width="700">
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-row><v-col></v-col></v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Email" v-model="mail" type="email" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Password" v-model="pass" type="password" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn text="Login" block variant="outlined" type="submit" />
            </v-col>
          </v-row>
          <v-row v-if="message">
            <v-col cols="12" md="12">
              {{ message }}
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
// Correctly import postRequest
import { useRouter } from 'vue-router';

const mail = ref('');
const pass = ref('');
const message = ref('');
const router = useRouter();

const login = () => {
  if (mail.value && pass.value) {
    message.value = '';
    http.postRequestGenericBE('login', {
      email: mail.value,
      password: pass.value
    }, function (data) {
      if (data.status == 'ok') {
        localStorage.setItem('token', data.token);
        router.push('/blog-admin');
      } else {
        message.value = data.error;
      }
    }, 'POST',true);
  }
};
</script>

<style scoped>
.login__container {
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
