import axios from '@/utils/request';
import { DEPT, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { DeptSearchParams, DeptTreeSeachDto, AddDeptInput } from './type';

// 获取部门分页列表
export const getPageDeptListData = (params: DeptSearchParams) =>
  axios.get(`${DEPT.ROOT}/list`, { params });

// 获取部门详情
export const getDeptInfoData = (id: number) =>
  axios.get(`${DEPT.ROOT}/${id}`, {});

// 获取部门树
export const getDeptTreeData = (params: DeptTreeSeachDto) =>
  axios.get(`${DEPT.ROOT}/tree`, { params });

// 新增部门
export const postDeptData = (params: AddDeptInput) =>
  axios.post(`${DEPT.ROOT}`, params);

// 编辑部门
export const putDeptData = (id: number, params: AddDeptInput) =>
  axios.put(`${DEPT.ROOT}/${id}`, params);

// 删除部门
export const deleteDeptData = (id: number) =>
  axios.delete(`${DEPT.ROOT}/${id}`);
