<template>
  <v-app>
    <v-app-bar v-if="isMobile && menuItems.length > 1" :color="data.info.primaryColor">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Fast Site</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-if="menuItems.length > 1"
      v-model="drawer"
      :permanent="!isMobile"
      :temporary="isMobile"
      :expand-on-hover="!isMobile"
      :rail="!isMobile"
      :style="{ backgroundColor: data.info.primaryColor }"
    >
      <v-list>
        <v-list-item prepend-icon="mdi-account" title="Fast Site" :subtitle="user" />
      </v-list>
      <v-list>
        <v-list-item-group>
          <template v-for="item in menuItems" :key="item.title">
            <v-list-item class="menu-item" :prepend-icon="item.icon" :title="item.title" @click="navigateTo(item)" />
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <View />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import View from './View.vue';
  import functionalities from '../views/Functionalities.json';
  import { useDataStore } from '@/stores/data';
  import mobile from '@/utils/mobile';
  import { useRouter } from 'vue-router';
  import http from '@/utils/http';

  const isMobile = mobile.setupMobileUtils();
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  const router = useRouter();
  
  const drawer = ref(!isMobile.value);
  const menuItems = ref([]);

  dataStore.initData();
  
  const getDataByName = (backendFunctionalities) => {
    return functionalities.functionalities.filter((item) =>
      backendFunctionalities.includes(item.title)
    );
  };

  const initMenu = () => {
  const functionalitiesFromStorage = localStorage.getItem('functionalities');
  console.log('Functionalities salvate nel localStorage:', functionalitiesFromStorage);

  if (functionalitiesFromStorage) {
    const functionalitiesArray = functionalitiesFromStorage;

    if (functionalitiesArray.length > 0) {
      menuItems.value = getDataByName(functionalitiesArray);
      console.log('sono nell if functionalities.length>0');
    } else {
      console.warn('Il localStorage contiene un array vuoto o non valido.');
      menuItems.value = [];
    }
  } else {
    console.warn('Nessuna funzionalità trovata nel localStorage.');
    menuItems.value = [];
  }
};

  initMenu();

  const loginBrooking = (item) => {
    const { nickname, password } = functionalities.brooking_user;
    console.log("Chiamata a loginBrooking con nickname:", nickname, "e password:", password);
    http.executePostRequestBrooking('api/authentication/login/', {
      username_or_email: nickname,
      password: password
    }, (data) => {
      alert(data.access);
      localStorage.setItem('token', data.access);
      console.log("Token salvato:", data.access);
      window.location.href = item.link;
    });
    
  };

  const navigateTo = (item) => {
    if (item.external)
      loginBrooking(item);
    else
      router.push(item.link);
  };
</script>

<style scoped>
  .menu-item {
    border-bottom: 1px solid;
    transition: padding 0.3s ease, background-color 0.3s ease;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    align-items: center;
  }

  .menu-item:hover {
    background-color: #f5f5f5;
  }
</style>
