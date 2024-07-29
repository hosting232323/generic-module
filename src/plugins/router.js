import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '/:id',
        name: 'Demo Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/',
        name: 'Production Home',
        component: () => import('@/views/Home.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const appBarHeight = 60;

    const scrollWithOffset = (el) => {
      const element = document.querySelector(el);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - appBarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          scrollWithOffset(to.hash);
          resolve();
        }, 0);
      });
    } else if (savedPosition)
      return savedPosition;
    else
      return { left: 0, top: 0 };
  }
});

export default router;
