export interface CommonDictDto {
  id: number;
  code: string;
  name: string;
  remark: string;
}

export interface CommonState {
  dictTypeList: Array<CommonDictDto>;
  dictList: Array<CommonDictDto>;
}
