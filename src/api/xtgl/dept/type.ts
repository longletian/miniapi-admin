export interface DeptListData {
  id: number;
  unitName: string;
  unitTypeId: number;
  status: number;
  sortNum: number;
  parentId: number;
  description: string;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface DeptSearchParams extends Partial<DeptListData> {
  page: number;
  pageSize: number;
}
