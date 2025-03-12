export type LIMIT_VALUES = 10 | 20 | 50 | 100;

export interface ICPaginationTableProps {
  page?: number;
  pages?: number;
  limit?: LIMIT_VALUES;
  total?: number;
  onPageChange?: (newPage: number) => void;
  onLimitChange?: (newLimit: LIMIT_VALUES) => void;
}
