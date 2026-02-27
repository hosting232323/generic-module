<template>
  <v-container class="login-container">
    <UserLogin 
      v-if="status == 'login'" 
      :logo="logo"
      :title="title"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :sign-up="signUp"
      :secret-key="secretKey"
      :iv="iv"
      :hostname="hostname"
      :google-client-id="googleClientId"
      @change-status="changeStatus"
      @call-back="emits('callBack', $event)"
    />
    <UserSignin 
      v-if="status == 'sign-in' && signUp" 
      :logo="logo"
      :title="signinTitle"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :hostname="hostname"
      @change-status="changeStatus"
    />
    <ChangePassword 
      v-if="status == 'change-password' && signUp" 
      :logo="logo"
      :title="changePasswordTitle"
      :primary-color="primaryColor"
      :secondary-color="secondaryColor"
      :secret-key="secretKey"
      :iv="iv"
      :hostname="hostname"
      @change-status="changeStatus"
    />
  </v-container>
</template>

<script setup>
import UserLogin from '@/components/users/UserLogin';
import UserSignin from '@/components/users/UserSignin';
import ChangePassword from '@/components/users/ChangePassword';

import { ref } from 'vue';

defineProps({
  logo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  signinTitle: {
    type: String,
    required: true
  },
  changePasswordTitle: {
    type: String,
    required: true
  },
  primaryColor: {
    type: String,
    default: ''
  },
  secondaryColor: {
    type: String,
    default: ''
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

const status = ref('login');
const emits = defineEmits(['callBack']);

const changeStatus = (value) => {
  status.value = value;
};
</script>
