import { defineStore } from 'pinia';

import { postLoginUserData, postAddUserData } from '@/api/xtgl/user/user';
import { clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { ResponseData } from '@/types/global';
import { UserInfo } from './types';
import useAppStore from '../app';
import { LoginData, AddUserData } from '../../../api/xtgl/user/type';

const useUserStore = defineStore('user', {
  state: () => ({
    userInfoData: null as UserInfo | null
  }),

  getters: {
    getUserInfo: (state) => state.userInfoData
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

    postAddUserData(user: AddUserData) {
      try {
        const res = postAddUserData(user);
        console.log(JSON.stringify(res));
        res.then((response) => {
          console.log(JSON.stringify(response.data));
        });
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
    }
  }
});

export default useUserStore;
