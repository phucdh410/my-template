import { ICPaginationTableProps } from "../types";

export interface ICSelectLimitProps
  extends Pick<ICPaginationTableProps, "limit" | "onLimitChange"> {}
