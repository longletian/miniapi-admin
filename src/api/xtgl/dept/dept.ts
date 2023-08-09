import axios from '@/utils/request';
import { DEPT, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { DeptSearchParams } from './type';

// 获取部门分页列表
export const getPageDeptListData = (params: DeptSearchParams) =>
  axios.get(`${DEPT.ROOT}/list`, { params });
