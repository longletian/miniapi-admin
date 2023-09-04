import axios from '@/utils/request';
import { WJGL } from '@/api/ykgl/constants/funcUrl';
import { WjglSearchParams } from './type';

// 获取问卷分页列表
export const getPageWjListData = (params: WjglSearchParams) =>
  axios.get(`${WJGL.ROOT}/page`, { params });
