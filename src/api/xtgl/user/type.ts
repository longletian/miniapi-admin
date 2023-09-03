export enum AccountRegirstType {
  None = 0,
  EMAIL = 1,
  TELEPHONE = 2,
}

// 验证码
export interface CatachaData {
  captchaId: string;
  captchaLength: number;
  picPath: string;
}

export interface LoginData {
  AccountName: string;
  category: number;
  PassWord: string;
  telePhone: string;
  email: string;
  accountRegirstType: AccountRegirstType;
}

export interface UserListData {
  id: number;
  name: string;
  nickName: string;
  unitId: number;
  unitName: string;
  headIcon: string;
  gender: number;
  birthDay: Date;
  telePhone: string;
  email: string;
  sortNum: number;
  description: string;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface UserSearchParams extends Partial<UserListData> {
  page: number;
  pageSize: number;
}

export interface UserInfoData {
  id: number;
  name: string;
  nickName: string;
  unitId: number;
  unitName: string;
  headIcon: string;
  gender: number;
  birthDay: Date;
  telePhone: string;
  email: string;
  sortNum: number;
  description: string;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface LoginInfoData {
  accessToken: string;
  expireTime: Date;
  refreshToken: string;
  refreshExpireTime: Date;
  user: UserInfoData;
}

export interface AddUserData {
  name: string;
  nickName: string;
  unitId: number;
  unitName: string;
  headIcon: string;
  gender: number;
  birthDay: Date;
  telePhone: string;
  email: string;
  sortNum: number;
  description: string;
  roleIds: number[];
  postIds: number[];
}
