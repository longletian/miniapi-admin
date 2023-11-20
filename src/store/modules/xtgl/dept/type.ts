import { PageReturnData } from '@/types/global';

export interface UnitTreeDto {
  id?: number;
  // parentId?: number;
  // createUser?: string;
  // createTime?: Date;
  // updateUser?: string;
  // updateTime?: Date;
  unitName?: string;
  // description?: string;
  // unitTypeId?: number;
  // sortNum?: number;
  // status?: number;
  children?: Array<UnitTreeDto>;
}

export interface DeptInfoDto {
  id?: number;
  parentId?: number;
  createUser?: string;
  createTime?: Date;
  updateUser?: string;
  updateTime?: Date;
  unitName?: string;
  description?: string;
  unitTypeId?: number;
  sortNum?: number;
  status?: number;
}

export interface DeptState {
  treeInfo: UnitTreeDto;
  deptInfo: DeptInfoDto;
  deptPageData: PageReturnData;
}
