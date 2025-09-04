import '@mdi/font/css/materialdesignicons.css';

export { default as DemoLayout } from './layouts/DemoLayout.vue';

export { default as DemoHomeLayout } from './layouts/demo/HomeLayout.vue';
export { default as DemoBlogLayout } from './layouts/demo/BlogLayout.vue';
export { default as DemoMenuLayout } from './layouts/demo/MenuLayout.vue';
export { default as DemoShopLayout } from './layouts/demo/ShopLayout.vue';
export { default as DemoBookingLayout } from './layouts/demo/BookingLayout.vue';
export { default as DemoEventDetailsLayout } from './layouts/demo/EventDetailsLayout.vue';
export { default as DemoProductDetailsLayout } from './layouts/demo/ProductDetailsLayout.vue';

export { default as AuthManager } from './components/users/AuthManager.vue';
export { default as Password } from './components/users/Password.vue';

export { encryptPassword, decryptPassword } from './utils/encrypt.js';
