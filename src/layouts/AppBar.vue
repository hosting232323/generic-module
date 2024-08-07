<template>
  <v-navigation-drawer v-model="drawer" location="bottom" temporary class="bento-drawer">
    <v-list>
      <v-list-item v-for="item in items" :key="item.path" class="bento-list-item">
        <div @click="link(item)">
          {{ item.title }}
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  
  <v-app-bar :elevation="2" class="bento-app-bar">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <!-- Add Logo Here -->
    <img src="@/assets/fastsite.svg" alt="Fastsite Logo" class="app-bar-logo" />
    <v-app-bar-title>
      <b>{{ info.name }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</b>
      <!-- Include TypeWriter Component -->
      <TypeWriter 
        :texts="['Power Your Business']" 
        :typing-speed="80" 
        :erasing-speed="80" 
        :new-text-delay="1500"
      />
    </v-app-bar-title>
    <div v-if="!isMobile" class="desktop-menu">
      <v-btn v-for="item in items" :key="item.path" variant="text" @click="link(item)" class="bento-btn">
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
import TypeWriter from '@/components/AnimatedTitle.vue'; // Import the TypeWriter component

const drawer = ref(null);
const route = useRoute();
const router = ref(useRouter());
const isMobile = mobile.setupMobileUtils();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;
const content = data.value.components;

const link = (item) => {
  if (item.type === 'ancor') {
    const pathUrl = route.params.id ? `/demo/${route.params.id}` : '';
    router.value.push(`${pathUrl}/#${item.path}`);
  } else if (item.type === 'externalLink') {
    window.open(item.path, '_blank');
  } else if (item.type === 'internalLink') {
    router.value.push(item.path);
  }
};

const items = computed(() => {
  let menuItems = [];
  if (data.value.addOn && data.value.addOn.includes('VirtualTour')) {
    menuItems.push({
      title: 'Virtual Tour',
      path: 'https://test-virtual-tour.replit.app/',
      type: 'externalLink'
    });
  }
  if (data.value.addOn && data.value.addOn.includes('Blog')) {
    menuItems.push({
      title: 'Blog',
      path: '/blog',
      type: 'internalLink'
    });
  }
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
.bento-app-bar {
  border-radius: 3px; /* Adjust the radius to your preference */
  overflow: hidden; /* Ensure content stays within the rounded corners */
}

.bento-drawer {
  border-radius: 15px 15px 0 0; /* Rounded top corners for the drawer */
}

.bento-list-item {
  border-radius: 15px; /* Optional: Rounded corners for list items */
  margin-bottom: 8px; /* Space between list items */
}

.app-bar-logo {
  height: 40px; /* Adjust the height as needed */
  margin-right: 16px; /* Space between logo and title */
}

.bento-btn {
  border-radius: 15px; /* Rounded corners for buttons */
}
</style>
