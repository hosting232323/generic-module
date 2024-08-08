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
    <img src="@/assets/fastsite.svg" alt="Fastsite Logo" class="app-bar-logo" />
    <v-app-bar-title>
      <b>{{ info.name }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;</b>
      <TypeWriter :texts="['Power Your Business']" :typing-speed="80" :erasing-speed="80" :new-text-delay="1500" />
    </v-app-bar-title>
    <!-- Logo container after the typewriter -->
    <div class="logo-container">
      <img v-for="n in logoCount" :key="n" :class="['app-bar-logo', 'animated-logo']" :style="{animationDelay: `${n * 0.5}s`}" src="@/assets/fastsite.svg" alt="Fastsite Logo" />
    </div>
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
import TypeWriter from '@/components/AnimatedTitle.vue';

const drawer = ref(false);
const route = useRoute();
const router = useRouter();
const isMobile = mobile.setupMobileUtils();
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const info = data.value.info;
const logoCount = ref(5); // or make this dynamic according to your needs

const link = (item) => {
  if (item.type === 'anchor') {
    const pathUrl = route.params.id ? `/demo/${route.params.id}` : '';
    router.push(`${pathUrl}/#${item.path}`);
  } else if (item.type === 'externalLink') {
    window.open(item.path, '_blank');
  } else if (item.type === 'internalLink') {
    router.push(item.path);
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
  menuItems = menuItems.concat(data.value.components
    .filter(section => section.menu)
    .map(section => ({
      title: section.menu,
      path: section.menu.toLowerCase(),
      type: 'anchor'
    })));
  return info.menuHomeLink ? [{ title: 'Home', path: '/', type: 'internalLink' }, ...menuItems] : menuItems;
});
</script>

<style scoped>
.bento-app-bar {
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.app-bar-logo {
  height: 40px;
  margin-right: 16px;
  flex-shrink: 0;
}

.bento-btn {
  border-radius: 15px;
}

@keyframes slideLogo {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-logo {
  animation: slideLogo 3s ease-in-out forwards;
}
</style>