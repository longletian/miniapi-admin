import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../type/types';

const XTGL: AppRouteRecordRaw = {
  path: '/cggl',
  name: 'cggl',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.cggl',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 2,
  },
  children: [
    {
      path: 'grzl',
      name: 'grzl',
      component: () => import('@/views/cggl/info/index.vue'),
      meta: {
        locale: 'menu.cggl.grzl',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'xtpz',
      name: 'xtpz',
      component: () => import('@/views/cggl/info/index.vue'),
      meta: {
        locale: 'menu.cggl.xtpz',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'attachment',
      name: 'attachment',
      component: () => import('@/views/cggl/info/index.vue'),
      meta: {
        locale: 'menu.cggl.attachment',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
export default XTGL;
