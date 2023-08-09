import axios from '@/utils/request';
import { PERMISSION, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { PermissionSearchParams } from './type';

// 获取角色分页列表
export const getPagePermissionListData = (params: PermissionSearchParams) =>
  axios.get(`${PERMISSION.ROOT}/list`, { params });
