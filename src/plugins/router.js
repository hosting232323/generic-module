import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      /*
      {
        path: '/:id',
        name: 'Demo Home',
        component: () => import('@/views/Home.vue')
      },
      */
      {
        path: '/',
        name: 'Production Home',
        component: () => import('@/views/Home.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
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
