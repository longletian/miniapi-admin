import { defineStore } from 'pinia';
import {
  getDeptTreeData,
  getDeptInfoData,
  postDeptData,
  putDeptData,
  getPageDeptListData,
  deleteDeptData
} from '@/api/xtgl/dept/dept';
import {
  DeptTreeSeachDto,
  AddDeptInput,
  DeptSearchParams
} from '@/api/xtgl/dept/type';
import { PageReturnData } from '@/types/global';
import { DeptState } from './type';

const deptStore = defineStore('dept', {
  state: (): DeptState => ({
    treeInfo: {},
    deptInfo: {},
    deptPageData: {
      totalPages: 0,
      totalCount: 0,
      currentPage: 0
    }
  }),

  getters: {
    getTree: (state) => state.treeInfo
  },

  actions: {
    async getDeptTreeData(params: DeptTreeSeachDto) {
      const res = await getDeptTreeData(params);
      this.treeInfo = res.data;
    },

    getPageDeptListData(params: DeptSearchParams): PageReturnData {
      getPageDeptListData(params).then((res) => {
        this.deptPageData = res.data;
      });
      return this.deptPageData;
    },

    async getDeptInfoData(id: number) {
      const res = await getDeptInfoData(id);
      this.deptInfo = res.data;
    },

    async postDeptData(addDeptInput: AddDeptInput) {
      const res = await postDeptData(addDeptInput);
      return res.data;
    },

    async putDeptData(id: number, params: AddDeptInput) {
      const res = await putDeptData(id, params);
      return res.data;
    },

    async deleteDeptData(id: number) {
      const res = await deleteDeptData(id);
      return res.data;
    }
  }
});

export default deptStore;
