import axios from '@/utils/request';
import { DICT, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { DictSearchParams, DictTypeSearchParams } from './type';

export const getPageDictTypeListData = (params: DictSearchParams) =>
  axios.get(`${DICT.ROOT}/page`, { params });

export const getDictInfoData = (id: number) => {
  axios.get(`${DICT.ROOT}/${id}`);
};

export const getPageDictListData = (params: DictTypeSearchParams) =>
  axios.get(`${DICT.TYPE_ROOT}/page`, { params });

export const getDictTypeInfoData = (id: number) => {
  axios.get(`${DICT.TYPE_ROOT}/${id}`);
};
