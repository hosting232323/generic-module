<template>
  <v-app>
    <v-app-bar v-if="isMobile && Array.isArray(functionalities)" :color="data.info.primaryColor">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Fast Site</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-if="Array.isArray(functionalities)"
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
        <v-list-item
          v-for="item in functionalities" :key="functionalitiesInfo[item].title"
          class="menu-item"
          :prepend-icon="item.icon"
          :title="functionalitiesInfo[item].title"
          @click="router.push(functionalitiesInfo[item].link)"
        />
      </v-list>
    </v-navigation-drawer>

    <View />
  </v-app>
</template>

<script setup>
import View from './View.vue';
import functionalitiesInfo from '@/assets/Functionalities.json';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import mobile from '@/utils/mobile';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/data';

const isMobile = mobile.setupMobileUtils();
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const router = useRouter();

const drawer = ref(!isMobile.value);
const functionalities = localStorage.getItem('user_functionalities');

dataStore.initData();
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
