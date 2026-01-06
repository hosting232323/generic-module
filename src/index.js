import '@mdi/font/css/materialdesignicons.css';

// Utenti e Login
export { encryptPassword, decryptPassword } from './utils/encrypt.js';
export { default as Password } from './components/users/Password.vue';
export { default as AuthManager } from './components/users/AuthManager.vue';

// Base Demo Home Page
export { default as DemoHomeLayout } from './layouts/demo/HomeLayout.vue';

// Add On: Blog
export { default as DemoPostLayout } from './layouts/demo/PostLayout.vue';
export { default as DemoBlogLayout } from './layouts/demo/BlogLayout.vue';

// Add On: Menu
export { default as DemoMenuLayout } from './layouts/demo/MenuLayout.vue';

// Add On: Shop
export { default as DemoShopLayout } from './layouts/demo/ShopLayout.vue';
export { default as DemoProductDetailsLayout } from './layouts/demo/ProductDetailsLayout.vue';

// Add On: Booking
export { default as DemoBookingLayout } from './layouts/demo/BookingLayout.vue';
export { default as DemoEventDetailsLayout } from './layouts/demo/EventDetailsLayout.vue';

// Add On: Chatty
export { default as ChattyBot } from './components/ChattyBot.vue';

// Demo Interattiva per Seller Dashboard
export { default as InteractiveDemoLayout } from './layouts/demo/InteractiveDemoLayout.vue';
