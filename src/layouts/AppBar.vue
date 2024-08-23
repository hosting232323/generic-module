<template>
  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-list>
      <v-list-item v-for="item in menuItems" :key="item.path" class="bento-list-item" @click="handleItemClick(item)">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar :elevation="2" class="bento-app-bar" :color="ourSite ? '' : info.primaryColor">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <img v-if="!isMobile && ourSite" src="@/assets/fastsite.svg" alt="Fastsite Logo" class="app-bar-logo"/>
    <v-app-bar-title>
      <b :class="{'our-title': ourSite}">{{ info.name }}</b>
      <TypeWriter v-if="ourSite" :texts="['PowerYourBusiness']" :typing-speed="80" :erasing-speed="80" :new-text-delay="1500" />
    </v-app-bar-title>
    <v-col v-if="!isMobile && ourSite" v-for="(action, index) in actions" :key="index">
      <v-btn
        size="small"
        :color="action.color"
        @click="handleAction(action.type)"
      >
        <v-icon size="30">{{ action.icon }}</v-icon>
      </v-btn>
    </v-col>
    <div v-if="!isMobile" class="desktop-menu">
      <v-btn v-for="item in menuItems" :key="item.path" variant="text" @click="handleItemClick(item)" class="bento-btn">
        {{ item.title }}
      </v-btn>
    </div>
  </v-app-bar>
  <v-snackbar
    v-model="showCopiedMessage"
    :timeout="2000"
    color="success"
    text
  >
    Numero copiato
  </v-snackbar>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import mobile from '@/utils/mobile';
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';
  import { useRouter, useRoute } from 'vue-router';

  import TypeWriter from '@/components/ourSections/AnimatedTitle.vue';

  const drawer = ref(false);
  const route = useRoute();
  const router = useRouter();
  const isMobile = mobile.setupMobileUtils();
  const { ourSite } = defineProps(['ourSite']);

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  const info = data.value.info;

  const actions = ref([
    { type: 'phone', icon: 'mdi-phone', label: 'Chiama', color: 'green' },
    { type: 'whatsapp', icon: 'mdi-whatsapp', label: 'WhatsApp', color: 'green' },
    { type: 'email', icon: 'mdi-email', label: 'Email', color: 'red' }
  ]);

  const showCopiedMessage = ref(false);

  const handleAction = (type) => {
    switch (type) {
      case 'phone':
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
          window.location.href = 'tel:+393478768340';
        else
          navigator.clipboard.writeText('+393478768340').then(() => {
            showCopiedMessage.value = true;
          });
        break;
      case 'whatsapp':
        window.open('https://wa.me/393478768340', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:giovanni.colasanto@fastsite.it';
        break;
    }
  };

  const menuItems = computed(() => {
    const items = [];

    if (data.value.addOn && data.value.addOn.includes('VirtualTour')) {
      items.push({
        title: 'Virtual Tour',
        path: 'https://test-virtual-tour.replit.app/',
        type: 'externalLink'
      });
    }

    if (data.value.addOn && data.value.addOn.includes('Blog')) {
      items.push({
        title: 'Blog',
        path: '/blog',
        type: 'internalLink'
      });
    }

    items.push(
      ...data.value.components
        .filter(section => section.menu)
        .map(section => ({
          title: section.menu,
          path: section.menu.toLowerCase(),
          type: 'anchor'
        }))
    );

    return info.menuHomeLink ? [{ title: 'Home', path: '/', type: 'internalLink' }, ...items] : items;
  });

  const handleItemClick = (item) => {
    if (item.type === 'anchor') {
      const pathUrl = route.params.id ? `/demo/${route.params.id}` : '';
      router.push(`${pathUrl}/#${item.path}`);
    } else if (item.type === 'externalLink') {
      window.open(item.path, '_blank');
    } else if (item.type === 'internalLink') {
      router.push(item.path);
    }
  };
</script>

<style scoped>
  .our-title {
    color: #E73C1D;
  }

  .bento-app-bar {
    font-family: 'HKGroteskBold', sans-serif;
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
    margin-left: 16px;
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

  @font-face {
    font-family: 'HKGroteskBold';
    src: url('@/assets/fonts/HKGrotesk-Bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
  }
</style>