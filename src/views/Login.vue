<template>
  <AuthManager
    :logo="logo"
    :title="title"
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    :redirectLink="redirectLink"
    :hostname="hostname"
    :signUp="false"
  />
</template>

<script setup>
  import { AuthManager } from 'generic-module';

  const logo = '/logo.png';
  const title = 'Login';
  const primaryColor = '#3498db';
  const secondaryColor = '#2ecc71';
  const redirectLink = '/blog-admin'; //** */

  const hostname = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
</script>
