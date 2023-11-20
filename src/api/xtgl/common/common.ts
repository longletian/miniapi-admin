import axios from '@/utils/request';
import { COMMON } from '../constants/funcUrl';
import { TypeParams } from './type';

// 获取验证码

export const getDictTypeListData = () =>
  axios.get(`${COMMON.ROOT}/dict-type`, {});

export const getDictListData = (typeCode: string) =>
  axios.get(`${COMMON.ROOT}/dict?typeCode=${typeCode}`, {});

export const getTypeListData = (params: TypeParams) =>
  axios.get(`${COMMON.ROOT}/type`, { params });
