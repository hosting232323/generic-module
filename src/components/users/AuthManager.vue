<template>
  <v-container class="login-container">
    <Login 
      v-if="status == 1" 
      @changeStatus="changeStatus"
      :logo="logo"
      :title="title"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :redirectLink="redirectLink"
      :signUp="signUp"
      :hostname="hostname"
      :googleClientId="googleClientId"
    />
    <Signin 
      v-if="status == 2 && signUp" 
      @changeStatus="changeStatus"
      :logo="logo"
      :title="signinTitle"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :redirectLink="redirectLink"
      :hostname="hostname"
    />
    <ChangePassword 
      v-if="status == 3 && signUp" 
      @changeStatus="changeStatus"
      :logo="logo"
      :title="changePasswordTitle"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :redirectLink="redirectLink"
      :hostname="hostname"
    />
    <Password
      v-if="status == 4 && signUp" 
      @changeStatus="changeStatus"
      :logo="logo"
      :title="newPasswordTitle"
      :primaryColor="primaryColor"
      :secondaryColor="secondaryColor"
      :redirectLink="redirectLink"
      :hostname="hostname"
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
