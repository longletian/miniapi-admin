export interface DictListDataDto {
  dictCode: string;
  dictName: string;
  description?: string;
  sortNum?: number;
  status: number;
  createUser?: string;
  createTime?: Date;
  updateUser?: string;
  updateTime?: Date;
  isDeleted?: boolean;
  id: number;
}

export interface DictTypeListDataDto {
  dictTypeCode: string;
  dictValue: string;
  dictText: string;
  description?: string;
  sortNum?: number;
  status: number;
  createUser?: string;
  createTime?: Date;
  updateUser?: string;
  updateTime?: Date;
  isDeleted?: boolean;
  id: number;
}

export interface DictSearchParams extends Partial<DictListDataDto> {
  page: number;
  pageSize: number;
}

export interface DictTypeSearchParams extends Partial<DictTypeListDataDto> {
  page: number;
  pageSize: number;
}

export interface AddDictTypeInput {
  dictCode: string;
  dictName: string;
  description: string;
  sortNum: number;
  status: number;
}

export interface AddDictInput {
  dictTypeCode: string;
  dictValue: string;
  dictText: string;
  description: string;
  sortNum: number;
  status: number;
}
