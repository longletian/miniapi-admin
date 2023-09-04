export interface WjglListData {
  id: number;
  name: string;
  fullScore: number;
  typeId: number;
  typeName: string;
  description: string;
  isPublished: boolean;
  yxqStime: Date;
  yxqEtime: Date;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
}

export interface WjglSearchParams extends Partial<WjglListData> {
  page: number;
  pageSize: number;
}
