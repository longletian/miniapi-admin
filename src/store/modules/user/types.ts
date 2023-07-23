// export type RoleType = '' | '*' | 'admin' | 'user';

export interface User {
  id: number;
  accountId: number;
  acountCategory: number;
  name: string;
  nickName: string;
  unitId: number;
  unitName: string;
  headIcon?: string;
  gender?: number;
  birthDay?: Date;
  telePhone?: string;
  email?: string;
  sortNum?: number;
  description: string;
  roles: any;
}

export interface UserInfo {
  userInfo: User;
  token: string;
  expireTime: string;
  refreshToken: string;
  refreshExpireTime: string;
}

export interface UserState {
  userInfo: UserInfo;
}

export interface UserRoleType {
  id: number;
  name: string;
  code: string;
  category: number;
}
