import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/ProductionLayout'),
    children: [
      {
        path: '/',
        name: 'Production Home',
        component: () => import('@/views/Home')
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/Blog')
      },
      {
        path: '/shop',
        name: 'Shop Page',
        component: () => import('@/views/Shop')
      },
      {
        path: '/product/:id',
        name: 'ProductDetails',
        component: () => import('@/views/ProductDetails'),
        props: true
      },
      {
        path: '/demo/:id',
        name: 'Demo',
        component: () => import('@/views/Home')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/Menu')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else if (savedPosition)
      return savedPosition;
    else
      return { left: 0, top: 0 };
  }
});

export default router;
