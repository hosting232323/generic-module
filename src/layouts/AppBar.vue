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

  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="isMobile">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-app-bar-title>
      <img v-if="info.logo" :src="info.logo" alt="Logo" class="app-logo">
      <b v-else>{{ info.name }}</b>
    </v-app-bar-title>
    <!-- <Cart v-if="getCartQuantity != 0"></Cart> -->
  </v-app-bar>

  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="!isMobile">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <v-app-bar-title>
      <img v-if="info.logo" :src="info.logo" alt="Logo" class="app-logo">
      <b v-else>{{ info.name }}</b>
    </v-app-bar-title>

    <div class="desktop-menu">
      <v-btn v-for="item in items" :key="item.path" variant="text" @click="link(item)">
        {{ item.title }}
      </v-btn>
      <!-- <Cart v-if="getCartQuantity != 0"></Cart> -->
    </div>
  </v-app-bar>

</template>

<script setup>
  import { ref, computed } from 'vue';
  // import mobile from '@/utils/mobile';
  import { useRouter, useRoute } from 'vue-router';
  
  import { useMobileUtils } from '@/utils/mobile';
  const { isMobile } = useMobileUtils();
  // import Cart from './Cart.vue';

  // import { useOrderStore } from '@/stores/order';
  // const orderStore = useOrderStore();

  const props = defineProps({
    info: {
      type: Object,
      required: true
    },
    addOn: {
      type: Array,
      default: () => []
    },
    components: {
      type: Object,
      required: true
    }
  });

  const info = computed(() => props.info);
  const addOn = computed(() => props.addOn);
  const components = computed(() => props.components);

  const drawer = ref(null);
  const route = useRoute();
  const router = ref(useRouter());
  // const isMobile = mobile.setupMobileUtils();

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
    if (addOn && addOn.value.includes('VirtualTour'))
      menuItems.push({
        title: 'Virtual Tour',
        path: 'https://test-virtual-tour.replit.app/',
        type: 'externalLink'
      });
    if (addOn && addOn.value.includes('Blog'))
      menuItems.push({
        title: 'Blog',
        path: '/blog',
        type: 'internalLink'
      });
    menuItems = menuItems.concat(components.value
      .filter(section => section.menu)
      .map(section => ({
        title: section.menu,
        path: section.menu.toLowerCase(),
        type: 'ancor'
      })));
    return info.value.menuHomeLink ? [{ title: 'Home', path: '/', type: 'internalLink' }, ...menuItems] : menuItems;
  });

// const getCartQuantity = computed(() => {
//   return orderStore.products.reduce((total, product) => total + product.quantity, 0);
// });
</script>

<style scoped>
.app-logo {
  height: 40px;
  max-width: 150px;
}
</style>
