<template>
  <v-container class="login-container">
    <Login 
      v-if="status == 'login'" 
      @changeStatus="changeStatus"
      @callBack="emits('callBack', $event)"
      :logo="logo"
      :title="title"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :signUp="signUp"
      :secretKey="secretKey"
      :iv="iv"
      :hostname="hostname"
      :googleClientId="googleClientId"
    />
    <Signin 
      v-if="status == 'sign-in' && signUp" 
      @changeStatus="changeStatus"
      :logo="logo"
      :title="signinTitle"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :hostname="hostname"
    />
    <ChangePassword 
      v-if="status == 'change-password' && signUp" 
      @changeStatus="changeStatus"
      :logo="logo"
      :title="changePasswordTitle"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :secretKey="secretKey"
      :iv="iv"
      :hostname="hostname"
    />
  </v-container>
</template>

<script setup>
import Login from '@/components/users/Login';
import Signin from '@/components/users/Signin';
import ChangePassword from '@/components/users/ChangePassword';

import { ref } from 'vue';

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
  primaryColor: {
    type: String,
    required: false
  },
  secondaryColor: {
    type: String,
    required: false
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
