<template class="app-bar">
  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-list>
      <v-list-item v-for="item in items" :key="item.path">
        <div @click="link(item)">
          {{ item.title }}
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :elevation="2" :color="info.primaryColor">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <!-- Add Logo Here -->
    <img src="@/assets/fastsite.svg" alt="Fastsite Logo" class="app-bar-logo" />
    <v-app-bar-title><b>
      {{ info.name }}
    </b></v-app-bar-title>
    <div v-if="!isMobile" class="desktop-menu">
      <v-btn v-for="item in items" :key="item.path" variant="text" @click="link(item)">
        {{ item.title }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
  import { ref, computed } from 'vue';
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
  const info = data.value.info;
  const content = data.value.components;


  const link = (item) => {
    if (item.type == 'ancor') {
      const pathUrl = route.params.id ? `/demo/${route.params.id}` : '';
      router.value.push(`${pathUrl}/#${item.path}`);
    } else if (item.type == 'externalLink')
      window.open(item.path, '_blank');
    else if (item.type == 'internalLink')
      router.value.push(item.path);
  }

  const items = computed(() => {
    let menuItems = [];
    if (data.value.addOn && data.value.addOn.includes('VirtualTour'))
      menuItems.push({
        title: 'Virtual Tour',
        path: 'https://test-virtual-tour.replit.app/',
        type: 'externalLink'
      });
    if (data.value.addOn && data.value.addOn.includes('Blog'))
      menuItems.push({
        title: 'Blog',
        path: '/blog',
        type: 'internalLink'
      });
    menuItems = menuItems.concat(content
      .filter(section => section.menu)
      .map(section => ({
        title: section.menu,
        path: section.menu.toLowerCase(),
        type: 'ancor'
      })));
    return info.menuHomeLink ? [{ title: 'Home', path: '/', type: 'internalLink' }, ...menuItems] : menuItems;
  });
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
  /* Styling for the logo */
  .app-bar-logo {
    height: 40px; /* Adjust the height as needed */
    margin-right: 16px; /* Space between logo and title */
  }
</style>
