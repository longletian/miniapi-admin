import axios from '@/utils/request';
import { ROLE, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { RoleSearchParams } from './type';

// 获取角色分页列表
export const getPageRoleListData = (params: RoleSearchParams) =>
  axios.get(`${ROLE.ROOT}/page`, { params });
