import {
  TableColumnData,
  TableData,
  TableRowSelection,
} from '@arco-design/web-vue/es/table/interface';

export interface TableDataDto {
  cloneColumns: TableColumnData[];
  rowSelection?: TableRowSelection;
  data: TableData[] | unknown;
}
