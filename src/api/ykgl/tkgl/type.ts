export interface TkglListData {
  id: number;
  name: string;
  typeId: number;
  typeName: string;
  categoryTypeId: number;
  categoryTypeName: string;
  ztjx: string;
  description: string;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface TkglSearchParams extends Partial<TkglListData> {
  page: number;
  pageSize: number;
}
