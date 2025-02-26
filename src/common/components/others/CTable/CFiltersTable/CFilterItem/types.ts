import { TFilterProps } from "../types";

export interface ICFilterItemProps<T> {
  filter: TFilterProps<T>;
  filterValue: T[keyof T];
  onFilterFieldChange?: (key: keyof T, value: any) => void;
}
