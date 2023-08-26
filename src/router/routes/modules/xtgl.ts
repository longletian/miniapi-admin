import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../type/types';

const XTGL: AppRouteRecordRaw = {
  path: '/xtgl',
  name: 'xtgl',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.xtgl',
    requiresAuth: true,
    icon: 'icon-file',
    order: 1,
  },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.user',
        requiresAuth: false,
        // roles: ['*'],
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/xtgl/role/index.vue'),
      meta: {
        locale: 'menu.xtgl.role',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/xtgl/menu/index.vue'),
      meta: {
        locale: 'menu.xtgl.menu',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dept',
      name: 'dept',
      component: () => import('@/views/xtgl/dept/index.vue'),
      meta: {
        locale: 'menu.xtgl.dept',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'post',
    //   name: 'post',
    //   component: () => import('@/views/xtgl/post/index.vue'),
    //   meta: {
    //     locale: 'menu.xtgl.post',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    {
      path: 'dict',
      name: 'dict',
      component: () => import('@/views/xtgl/dict/index.vue'),
      meta: {
        locale: 'menu.xtgl.dict',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'log',
      name: 'log',
      component: '',
      meta: {
        locale: 'menu.xtgl.log',
        requiresAuth: true,
      },
      children: [
        {
          path: 'action',
          name: 'action',
          component: () => import('@/views/xtgl/log/action/index.vue'),
          meta: {
            locale: 'menu.xtgl.log.action',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'loginlog',
          name: 'loginlog',
          component: () => import('@/views/xtgl/log/login/index.vue'),
          meta: {
            locale: 'menu.xtgl.log.loginlog',
            requiresAuth: true,
            roles: ['*'],
          },
        },
      ],
    },
  ],
};
export default XTGL;
