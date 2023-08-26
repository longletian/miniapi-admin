import { defineStore } from 'pinia';

import { postLoginUserData, postResetPassWordData } from '@/api/xtgl/user/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState, UserInfo } from './types';
import useAppStore from '../app';
import { LoginData } from '../../../api/xtgl/user/type';

const useUserStore = defineStore('user', {
  state: () => ({
    userInfoData: null as UserInfo | null,
  }),

  getters: {
    getUserInfo: (state) => state.userInfoData,
  },

  actions: {
    postLoginUserData(loginForm: LoginData) {
      try {
        postLoginUserData(loginForm);

        // const res = res.then((response) => {
        //   this.userInfoData = response.data.userInfoData;
        //   setToken(response.data.token);
        // });
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    async logout() {
      try {
        // await userLogout();
        this.logoutCallBack();
      } finally {
        this.logoutCallBack();
      }
    },

    resetInfo() {
      this.$reset();
    },

    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
  },

  // actions: {
  //   switchRoles() {
  //     return new Promise((resolve) => {
  //       this.role = this.role === 'user' ? 'admin' : 'user';
  //       resolve(this.role);
  //     });
  //   },
  //   // Set user's information
  //   setInfo(partial: Partial<UserState>) {
  //     this.$patch(partial);
  //   },

  //   // Reset user's information
  //   resetInfo() {
  //     this.$reset();
  //   },

  //   // Get user's information
  //   async info() {
  //     const res = await getUserInfo();

  //     this.setInfo(res.data);
  //   },

  //   // Login
  //   async login(loginForm: LoginData) {
  //     try {
  //       const res = await userLogin(loginForm);
  //       setToken(res.data.token);
  //     } catch (err) {
  //       clearToken();
  //       throw err;
  //     }
  //   },

  // },
});

export default useUserStore;
