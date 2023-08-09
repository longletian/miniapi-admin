export interface ActionLogListDataDto {
  moduleName: string;
  category: number;
  actionMethodType: string;
  accountId: number;
  userName?: string;
  ip?: string;
  openUrl?: string;
  operParam?: string;
  jsonResult?: string;
  status: number;
  actionTime: Date;
  id: number;
}

export interface LoginLogListDataDto {
  userName: string;
  ip: string;
  browser: string;
  loginAddress: string;
  os?: string;
  status: number;
  msg?: string;
  loginTime: Date;
  id: number;
}

export interface LoginLogSearchParams extends Partial<LoginLogListDataDto> {
  page: number;
  pageSize: number;
}

export interface ActionLogSearchParams extends Partial<ActionLogListDataDto> {
  page: number;
  pageSize: number;
}
