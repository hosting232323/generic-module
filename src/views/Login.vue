<template>
  <AuthManager
    logo="/logo.png"
    title="Login"
    :primaryColor="data.info.primaryColor"
    :secondaryColor="data.info.secondaryColor"
    redirectLink="/blog-admin"
    :hostname="hostname"
    :signUp="false"
  />
</template>

<script setup>
  import { AuthManager } from 'generic-module';
  import { useDataStore } from '@/stores/data';
  import { storeToRefs } from 'pinia';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  const hostname = import.meta.env.VITE_HOSTNAME_GENERICBACKED;
</script>
