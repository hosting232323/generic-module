<template class="app-bar">
  <transition name="slide">
    <div v-if="drawer" class="mobile-drawer" :style="{ backgroundColor: info.primaryColor }">
      <div class="drawer-items">
        <p
          v-for="item in items"
          :key="item.path"
          @click="link(item)"
          class="drawer-title"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
  </transition>

  <v-app-bar :elevation="2" class="navbar-mobile" :color="info.primaryColor" v-if="isMobile">
    <div class="hamburger" :class="{ 'hamb-active': drawer }"  @click="drawer = !drawer">
      <div class="bar"></div>
    </div>
    <v-app-bar-title>
      <div class="d-flex align-center" @click="goHome">
        <img  v-if="info.logo && (info.logoMode === 'logo' || info.logoMode === 'both')" :src="info.logo" alt="Logo" class="app-logo cursor-pointer">
        <b v-if="info.logoMode === 'text' || info.logoMode === 'both' || !info.logoMode" style="margin-left: 10px;" class="cursor-pointer">{{ info.name }}</b>
      </div>
    </v-app-bar-title>
    <Cart v-if="cartActive && getCartQuantity != 0"></Cart>
    <Language v-if="multilingualActive" />
  </v-app-bar>

  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="!isMobile">
    <v-app-bar-title>
      <div class="d-flex align-center" @click="goHome">
        <img v-if="info.logo && (info.logoMode === 'logo' || info.logoMode === 'both')" :src="info.logo" alt="Logo" class="app-logo cursor-pointer">
        <b v-if="info.logoMode === 'text' || info.logoMode === 'both' || !info.logoMode" style="margin-left: 10px;" class="cursor-pointer">{{ info.name }}</b>
      </div>
    </v-app-bar-title>

    <div class="desktop-menu d-flex justify-center align-center" >
      <v-btn v-for="item in items" :key="item.path" variant="text" @click="link(item)">
        {{ item.title }}
      </v-btn>
      <Cart v-if="cartActive && getCartQuantity != 0"></Cart>
      <Language v-if="multilingualActive" />
    </div>
  </v-app-bar>

</template>

<script setup>
import Cart from './Cart.vue';
import Language from '@/components/sections/Language.vue';

import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { setupMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';
import { useRoute, useRouter } from 'vue-router'

const { getText, getAncor } = useLanguageStore();
const orderStore = useOrderStore();

const drawer = ref(false);
const route = useRoute();
const router = useRouter();
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const info = data.value.info;
const content = data.value.components;
const addOn = data.value.addOn;

const cartActive = addOn && addOn.includes('Shop');
const multilingualActive = addOn && addOn.includes('Multilingual') && info.locales.length > 1;
const isMobile = setupMobileUtils();

const link = (item) => {
  if (isMobile.value) drawer.value = !drawer.value;
  if (item.type === 'ancor') {
    const id = getAncor(item.path).toLowerCase();
    const target = document.getElementById(id);
    if (target) {
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  } else if (item.type === 'externalLink') {
    window.open(item.path, '_blank');
  } else if (item.type === 'internalLink') {
    window.location.href = item.path;
  }
}


const items = computed(() => {
  let menuItems = [];
  const onHome = route.path === '/';

  if (addOn && addOn.includes('VirtualTour')) {
    menuItems.push({
      title: 'Virtual Tour',
      path: 'https://test-virtual-tour.replit.app/',
      type: 'externalLink'
    });
  }

  if (addOn && addOn.includes('Blog')) 
    menuItems.push({ title: 'Blog', path: '/blog', type: 'internalLink' });
  if (addOn && addOn.includes('Menu')) 
    menuItems.push({ title: 'Menu', path: '/menu', type: 'internalLink' });
  if (addOn && addOn.includes('Shop')) 
    menuItems.push({ title: 'Shop', path: '/shop', type: 'internalLink' });
  if (addOn && addOn.includes('Booking'))
    menuItems.push({ title: 'Booking', path: '/booking', type: 'internalLink' });

  if (!onHome) {
    menuItems.unshift({ title: 'Home', path: '/', type: 'internalLink' });
  }

  if (onHome) {
    const anchorItems = content
      .filter(section => section.menu)
      .map(section => ({
        title: getText(section.menu),
        path: getAncor(section.menu).toLowerCase(),
        type: 'ancor'
      }));
    menuItems = [...anchorItems, ...menuItems];
  }

  return menuItems;
});

const getCartQuantity = computed(() => {
  return orderStore.products.reduce((total, product) => total + product.quantity, 0);
});

watch(drawer, (newVal) => {
  const previewCard = document.querySelector('.preview-card');
  
  if (previewCard) {
    if (newVal) {
      previewCard.style.overflow = 'hidden';
      previewCard.classList.add('no-scroll');
    } else { 
      previewCard.style.overflow = 'auto';
      previewCard.classList.remove('no-scroll');
    }
  }
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const goHome = () => {
  if (window.location.pathname === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.app-logo {
  height: 40px;
  max-width: 150px;
}

.navbar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hamburger {
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  margin-left: 4px;
}

.bar{
  width: 20px;
  height: 2px;
  transition: .5s;
  position: relative;
  background-color: #fff;
}

.bar::before, .bar::after{
  content: "";
  position: absolute;
  height: inherit;
  width: inherit;
  transition: .5s;
  background-color: #fff;
}

.bar::before{
  transform: translateY(-7px);
}
.bar::after{
  transform: translateY(7px);
}


.hamb-active .bar{
  transform: rotate(-360deg);
  background-color: transparent;
}
.hamb-active .bar::before{
  transform: translateY(0) rotate(45deg);
}
.hamb-active .bar::after{
  transform: translateY(0) rotate(-45deg);
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}

.mobile-drawer {
  position: fixed;
  top: 64px;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 64px 0;
}

.drawer-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-bottom: 64px;
}

.drawer-title {
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
