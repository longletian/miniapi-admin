import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../type/types';

const SJKSH: AppRouteRecordRaw = {
  path: '/sjksh',
  name: 'sjksh',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.sjksh',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 3,
  },
  // children: [
  //   {
  //     path: 'index',
  //     name: 'index',
  //     component: () => import('@/views/sjksh/index.vue'),
  //     meta: {
  //       locale: 'menu.ssjksh.index',
  //       requiresAuth: true,
  //       roles: ['*'],
  //     },
  //   },
  // ],
};
export default SJKSH;
