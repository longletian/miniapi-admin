export interface PermissListData {
  id: number;
  menuName: string;
  menuPath: string;
  description: string;
  menuUrl: string;
  component: string;
  menuCode: string;
  menuIcon: string;
  category: number;
  isFrame: boolean;
  visible: number;
  sortNum: number;
  status: number;
  parentId: number;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface PermissionSearchParams extends Partial<PermissListData> {
  page: number;
  pageSize: number;
}

export interface AddPermissionData {
  menuName: string;
  menuCode: string;
  parentId: 0;
  menuPath: string;
  menuUrl: string;
  component: string;
  description: string;
  category: number;
  isFrame: boolean;
  visible: number;
  menuIcon: string;
  sortNum: number;
  status: number;
}

export interface PermissionInfoData {
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
  menuPath: string;
  menuName: string;
  description: string;
  menuUrl: string;
  component: string;
  status: number;
  menuCode: string;
  menuIcon: string;
  sortNum: number;
  isFrame: boolean;
  visible: number;
  category: number;
  children: null;
  id: number;
  parentId: number;
}
