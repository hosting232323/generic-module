<template class="app-bar">
  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-list>
      <v-list-item v-for="item in items">
        <div v-if="data[item.path]" @click="link(item.path)">
          {{ item.title }}
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :elevation="2" :color="data.primaryColor">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <v-app-bar-title><b>
      {{ data.name }}
    </b></v-app-bar-title>
    <div v-if="!isMobile" class="desktop-menu" v-for="item in items">
      <v-btn v-if="data[item.path]" variant="text" @click="link(item.path)">
        {{ item.title }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
  import { ref } from 'vue';
  import mobile from '@/utils/mobile';
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  import { useRouter, useRoute } from 'vue-router';

  const drawer = ref(null);
  const route = useRoute();
  const router = ref(useRouter());
  const isMobile = mobile.setupMobileUtils();

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const link = (path) => {
    const userId = route.params.id ? `/${route.params.id}` : '';
    router.value.push(`${userId}/#${path}`);
  }

  const items = ref([
    {
      title: 'Servizi',
      path: 'services'
    },
    {
      title: 'Vantaggi',
      path: 'advantages'
    },
    {
      title: 'Contatti',
      path: 'contacts'
    }
  ]);
</script>

<style scoped>
  .desktop-menu {
    padding-right: 20px;
  }
  .router-link-exact-active,
  .router-link-active,
  .router-link-exact-active a {
    text-decoration: none;
    color: inherit;
  }
  .router-link:hover {
    text-decoration: underline;
  }
</style>
