import { Column } from "react-table";

export interface TableProps<Data extends object = any> {
  columns: Column<Data>[];
  data: Data[];
  className?: string;
  refetch?: () => void;
  params?: any;
  onRowClick?: (val: any) => void;
  children?: any;
}
