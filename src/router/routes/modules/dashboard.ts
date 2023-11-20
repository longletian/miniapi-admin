import { App } from 'vue';
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../type/types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: false,
    icon: 'icon-dashboard',
    order: 0
    // roles: ['*'],
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: false
        // roles: ['*'],
      }
    }
  ]
};

export default DASHBOARD;
