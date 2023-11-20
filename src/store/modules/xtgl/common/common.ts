import { defineStore } from 'pinia';
import { getDictTypeListData, getDictListData } from '@/api/xtgl/common/common';
import { CommonState } from './type';

const commonStore = defineStore('common', {
  state: (): CommonState => ({
    dictTypeList: [],
    dictList: []
  }),

  getters: {
    getDictTypeList: (state) => state.dictTypeList,
    getDictList: (state) => state.dictList
  },

  actions: {
    async getDictTypeListData() {
      const res = await getDictTypeListData();
      this.dictTypeList = res.data;
    },

    getDictListData(typeCode: string) {
      getDictListData(typeCode).then((res) => {
        console.log(res.data);
        this.dictList = res.data;
      });
    }
  }
});

export default commonStore;
