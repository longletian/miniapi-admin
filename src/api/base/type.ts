export interface SearchQo {
  page: number;
  pageSize: number;
  keyWord: string;
}

export interface ResponseData {
  msgCode: string;
  msgMessage: string;
  data: any;
}
