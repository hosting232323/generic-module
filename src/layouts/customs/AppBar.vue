<template class="app-bar">
  <v-app-bar
    v-if="!isMobile"
    :elevation="2"
    :color="data.info.primaryColor"
  >
    <div class="desktop-menu d-flex justify-center align-center">
      <v-btn
        v-for="item in items"
        :key="item.path"
        variant="text"
        style="font-size: 12px;"
        @click="link(item)"
      >
        {{ item.title }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useDataStore } from '@/stores/data';
import { setupMobileUtils } from '@/utils/mobile';
import { useLanguageStore } from '@/stores/language';
import { useRoute, useRouter } from 'vue-router';

const { getText } = useLanguageStore();

const drawer = ref(false);
const route = useRoute();
const router = useRouter();
const dataStore = useDataStore();
const { data, demoId } = storeToRefs(dataStore);

const content = data.value.components;
const addOn = data.value.addOn;

const isMobile = setupMobileUtils();

const onDemo = computed(() => route.path.startsWith('/demo/'));
const homePath = computed(() =>
  onDemo.value && demoId.value ? `/demo/${demoId.value}` : '/'
);

const getInternalPath = (path) => {
  return onDemo.value && demoId.value ? `/demo/${demoId.value}${path}` : path;
};

const buildAddOnLinks = (addOns) => {
  const map = {
    Blog: '/blog',
    Menu: '/menu',
    Shop: '/shop',
    Booking: '/booking',
  };

  return Object.entries(map)
    .filter(([key]) => addOns?.includes(key))
    .map(([title, path]) => ({
      title,
      path: getInternalPath(path),
      type: 'internalLink',
    }));
};

const items = computed(() => {
  let menuItems = [];
  menuItems.push(...buildAddOnLinks(addOn));

  if (addOn?.includes('VirtualTour'))
    menuItems.push({
      title: 'Virtual Tour',
      path: 'https://test-virtual-tour.replit.app/',
      type: 'externalLink',
    });

  const anchorItems = content
    .filter((section) => section.menu)
    .map((section) => ({
      title: getText(section.menu),
      path: getInternalPath(`/#${section.type}`),
      type: 'internalLink'
    }));

  return [
    ...anchorItems, 
    ...menuItems
  ];
});

const link = (item) => {
  if (isMobile.value) drawer.value = false;

  switch (item.type) {
  case 'externalLink':
    window.open(item.path, '_blank');
    break;
  case 'internalLink':
    router.push(item.path);
    break;
  case 'home':
    goHome();
    break;
  }
};

const goHome = () => {
  const currentPath = window.location.pathname;
  const targetPath = homePath.value;

  if (currentPath === targetPath) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    router.push(targetPath);
  }
};

watch(drawer, (newVal) => {
  const previewCard = document.querySelector('.preview-card');

  if (previewCard) {
    previewCard.style.overflow = newVal ? 'hidden' : 'auto';
    previewCard.classList.toggle('no-scroll', newVal);
  }
  document.body.style.overflow = newVal ? 'hidden' : '';
});
</script>

<style>
.app-logo {
  height: 40px;
  max-width: 150px;
}
.v-toolbar__content {
  justify-content: center !important;
}
</style>
