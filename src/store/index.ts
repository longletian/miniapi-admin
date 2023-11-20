import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useXtglStore from './modules/xtgl/index';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useXtglStore };
export default pinia;
