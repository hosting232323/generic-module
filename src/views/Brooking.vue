<template>
    <h1>Ciao</h1>
  </template>
  
  <script setup>
    import { useHead } from '@vueuse/head';
    import http from '@/utils/http';
  
    http.getRequestBrooking('api/business_activity/ownership/user/1/', {}, function (data) {
        console.log(data);
    }, true);

    useHead({
      title: 'About Page',
      meta: [
        { name: 'description', content: 'This is the about page' }
      ]
    });
  </script>
  