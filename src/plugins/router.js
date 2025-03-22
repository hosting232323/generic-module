import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/ProductionLayout'),
    children: [
      {
        path: '/',
        name: 'Production Home',
        component: () => import('@/views/Home'),
        meta: { chatty: 3 }
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/Blog'),
        meta: { chatty: 5 }
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/DemoLayout'),
    children: [
      {
        path: '/demo/:id',
        name: 'Demo Home',
        component: () => import('@/views/Home'),
        meta: { chatty: 0 }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/Index')
      },
      {
        path: '/admin/blog',
        name: 'Blog Admin',
        component: () => import('@/views/admin/Blog'),
        meta: { chatty: 5 }
      },
      {
        path: '/admin/booking',
        name: 'Prenotazioni',
        component: () => import('@/views/admin/Booking')
      },
      {
        path: '/admin/wooffy',
        name: 'Wooffy',
        component: () => import('@/views/admin/Wooffy')
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
