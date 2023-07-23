import axios from '@/utils/request';
import { USER, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { SearchQo } from '@/api/base/type';
import { LoginData, AddUserData } from './type';

// 获取用户分页列表
export const getPageUserListData = (params: SearchQo) =>
  axios.get(USER.ROOT + BASE.LIST, { params });

// 获取用户详情
export const getUserInfoData = (id: number) => axios.get(USER.ROOT);

// 编辑用户
export const postEditUserData = (id: number, params: AddUserData) =>
  axios.post(USER.ROOT);

// 新增用户
export const postAddUserData = (params: AddUserData) => axios.post(USER.ROOT);

// 删除用户
export const postDeleteUserData = (id: number) => axios.post(USER.ROOT);

// 获取验证码
export const postVerificationCode = () => {
  return axios.post(COMMON.VERIFICATIONCODE);
};

// 登录
export const postLoginUserData = (data: LoginData) => {
  return axios.post(COMMON.LOGIN, data);
};

// 重置密码
export const postResetPassWordData = (id: number) => axios.post(USER.ROOT);
