import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../type/types';

const XTGL: AppRouteRecordRaw = {
  path: '/ykgl',
  name: 'ykgl',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.ykgl',
    requiresAuth: true,
    icon: 'icon-file',
    order: 3
  },
  children: [
    {
      path: 'wjgl',
      name: 'wjgl',
      component: () => import('@/views/ykgl/wjgl/index.vue'),
      meta: {
        locale: 'menu.ykgl.wjgl',
        requiresAuth: false
        // roles: ['*'],
      }
    },
    {
      path: 'tkgl',
      name: 'tkgl',
      component: () => import('@/views/ykgl/tkgl/index.vue'),
      meta: {
        locale: 'menu.ykgl.tkgl',
        requiresAuth: false
        // roles: ['*'],
      }
    },
    {
      path: 'jcls',
      name: 'jcls',
      component: () => import('@/views/ykgl/jcls/index.vue'),
      meta: {
        locale: 'menu.ykgl.jcls',
        requiresAuth: false
        // roles: ['*'],
      }
    }
  ]
};
export default XTGL;
