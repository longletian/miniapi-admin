import axios from '@/utils/request';
import { TKGL } from '@/api/ykgl/constants/funcUrl';
import { TkglSearchParams } from './type';

// 获取题库分页列表
export const getPageTkListData = (params: TkglSearchParams) =>
  axios.get(`${TKGL.ROOT}/page`, { params });
