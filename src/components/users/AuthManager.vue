<template>
  <v-container class="login-container">
    <Login 
      v-if="status == 1" 
      :logo="logo"
      :title="title"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :redirect-link="redirectLink"
      :sign-up="signUp"
      :secret-key="secretKey"
      :iv="iv"
      :hostname="hostname"
      :google-client-id="googleClientId"
      @changeStatus="changeStatus"
    />
    <Signin 
      v-if="status == 2 && signUp" 
      :logo="logo"
      :title="signinTitle"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :redirect-link="redirectLink"
      :hostname="hostname"
      @change-status="changeStatus"
    />
    <ChangePassword 
      v-if="status == 3 && signUp" 
      :logo="logo"
      :title="changePasswordTitle"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :redirect-link="redirectLink"
      :secret-key="secretKey"
      :iv="iv"
      :hostname="hostname"
      @change-status="changeStatus"
    />
    <Password
      v-if="status == 4 && signUp" 
      :logo="logo"
      :title="newPasswordTitle"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :redirect-link="redirectLink"
      :hostname="hostname"
      @change-status="changeStatus"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Login from '@/components/users/Login.vue';
import Signin from '@/components/users/Signin.vue';
import ChangePassword from '@/components/users/ChangePassword.vue';
import Password from '@/components/users/Password.vue';

const status = ref(1);

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

const changeStatus = (value) => {
  status.value = value;
};
</script>
