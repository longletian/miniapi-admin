// import { defineStore } from 'pinia';
// import { getPageRoleListData } from '@/api/xtgl/role/role';

// import {
//   AddDeptInput,
//   DeptSearchParams
// } from '@/api/xtgl/dept/type';
// import { PageReturnData } from '@/types/global';
// import { RoleState } from './type';

// const deptStore = defineStore('dept', {
//   state: (): RoleState => ({
//     roleInfo: {}
//   }),

//   getters: {
//     getTree: (state) => state.roleInfo
//   },

//   actions: {
//     async postDeptData(addDeptInput: AddDeptInput) {
//       const res = await postDeptData(addDeptInput);
//       return res.data;
//     },

//     async putDeptData(id: number, params: AddDeptInput) {
//       const res = await putDeptData(id, params);
//       return res.data;
//     },

//     async deleteDeptData(id: number) {
//       const res = await deleteDeptData(id);
//       return res.data;
//     }
//   }
// });

// export default deptStore;
