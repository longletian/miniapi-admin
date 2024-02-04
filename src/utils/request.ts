import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
// import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { ResponseData } from '@/types/global';

let baseUrl = '';
if (import.meta.env.VITE_API_BASE_URL) {
  baseUrl = import.meta.env.VITE_API_BASE_URL;
}

// 创建axios实例
const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // debugger;
    const res = response.data;
    if (res.msgCode !== '0') {
      Message.error({
        content: res.msgMessage || 'Error',
        duration: 5 * 1000
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (
      //   [50008, 50012, 50014].includes(res.code) &&
      //   response.config.url !== '/api/user/info'
      // ) {
      //   Modal.error({
      //     title: 'Confirm logout',
      //     content:
      //       'You have been logged out, you can cancel to stay on this page, or log in again',
      //     okText: 'Re-Login',
      //     async onOk() {
      //       // const userStore = useUserStore();

      //       // await userStore.logout();
      //       window.location.reload();
      //     }
      //   });
      // }
      return Promise.reject(new Error('Error'));
    }
    return res;
  },

  // 失败回调
  (error) => {
    // 处理网络错误
    const { msg } = error;
    // const { status } = error.response;
    Message.error({
      content: msg || 'Request Error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default request;
