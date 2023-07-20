import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import appRoutes from './routes';
import { REDIRECT_MAIN } from './routes/base';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes,
    REDIRECT_MAIN,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
