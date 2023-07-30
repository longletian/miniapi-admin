export interface RoleListData {
  id: number;
  roleName: string;
  roleCode: string;
  description: number;
  category: number;
  sortNum: number;
  status: number;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface RoleSearchParams extends Partial<RoleListData> {
  page: number;
  pageSize: number;
}
