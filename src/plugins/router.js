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
        path: '/blog/:type',
        name: 'Blog',
        component: () => import('@/views/Blog')
      },
      {
        path: '/contributi-pa',
        name: 'ContributiPA',
        component: () => import('@/views/ContributiPA')
      },
      {
        path: '/blog/:type/:id',
        name: 'Dettaglio Post',
        component: () => import('@/views/Post')
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
