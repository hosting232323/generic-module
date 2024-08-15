<template>
  <Loading />
</template>

<script setup>
import { useRouter } from 'vue-router';
import Loading from '@/layouts/Loading';
import functionalitiesInfo from '@/assets/Functionalities.json';

const router = useRouter();
const functionalities = localStorage.getItem('user_functionalities');
const functionality = Array.isArray(functionalities) ? functionalities[0] : functionalities;
router.push(functionalitiesInfo [functionality].link);
</script>
