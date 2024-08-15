<template>
  <AuthManager
    logo="/logo.png"
    title="Login"
    :secondaryColor="data.info.primaryColor"
    :primaryColor="data.info.secondaryColor"
    redirectLink="/admin"
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
