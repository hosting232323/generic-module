import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/ProductionLayout'),
    children: [
      {
        path: '/',
        name: 'Production Home',
        component: () => import('@/views/HomePage')
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/BlogPage')
      },
      {
        path: '/blog/:id',
        name: 'Dettaglio Post',
        component: () => import('@/views/PostPage')
      },
      {
        path: '/shop',
        name: 'Shop Page',
        component: () => import('@/views/ShopPage')
      },
      {
        path: '/product/:id',
        name: 'ProductDetails',
        component: () => import('@/views/ProductDetails'),
        props: true
      },
      {
        path: '/payment/success',
        name: 'Pagamento Riuscito',
        component: () => import('@/views/payment/SuccessPage'),
      },
      {
        path: '/payment/failed',
        name: 'Pagamento Fallito',
        component: () => import('@/views/payment/CancelPage'),
      },
      {
        path: '/demo/:id',
        name: 'Demo',
        component: () => import('@/views/HomePage')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/MenuPage')
      },
      {
        path: '/booking',
        name: 'Booking',
        component: () => import('@/views/BookingPage')
      },
      {
        path: '/booking/:id',
        name: 'EventDetails',
        component: () => import('@/views/EventDetails')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, savedPosition) {
    if (to.hash)
      return {
        behavior: 'smooth',
        top: document.getElementById(to.hash.replace('#','')).getBoundingClientRect().top +
          window.scrollY - window.innerHeight * 0.2
      };
    else if (savedPosition) return savedPosition;
    else return { left: 0, top: 0 };
  }
});

export default router;
