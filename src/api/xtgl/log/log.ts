import axios from '@/utils/request';
import { LOG, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { LoginLogSearchParams, ActionLogSearchParams } from './type';

export const getPageLoginLogListData = (params: LoginLogSearchParams) =>
  axios.get(`${LOG.LOGIN_ROOT}/list`, { params });

export const getLoginLogInfoData = (id: number) => {
  axios.get(`${LOG.LOGIN_ROOT}/${id}`);
};

export const getPageActionLogListData = (params: ActionLogSearchParams) =>
  axios.get(`${LOG.ACTION_ROOT}/list`, { params });

export const getActionLoInfoData = (id: number) => {
  axios.get(`${LOG.ACTION_ROOT}/${id}`);
};
