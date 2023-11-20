import { PageReturnData } from '@/types/global';

export interface RoleInfoDto {
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

export interface RoleState {
  roleInfo: RoleInfoDto;
}
