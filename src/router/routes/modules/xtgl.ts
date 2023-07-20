import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

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
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.role',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.menu',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dept',
      name: 'dept',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.dept',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'post',
      name: 'post',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.post',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dict',
      name: 'dict',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.dict',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'log',
      name: 'log',
      component: () => import('@/views/xtgl/user/index.vue'),
      meta: {
        locale: 'menu.xtgl.log',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'action',
          name: 'action',
          component: () => import('@/views/xtgl/user/index.vue'),
          meta: {
            locale: 'menu.xtgl.log.action',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/xtgl/user/index.vue'),
          meta: {
            locale: 'menu.xtgl.log.login',
            requiresAuth: true,
            roles: ['*'],
          },
        },
      ],
    },
  ],
};
export default XTGL;
