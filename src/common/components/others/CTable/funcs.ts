import dayjs from "dayjs";

import { TFilterProps } from "./CFiltersTable/types";

export const hasDifferentValue = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean =>
  [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].some(
    (key) => !!(obj1[key] || obj2[key]) && obj1[key] !== obj2[key]
  );

export const displayLabel = <T extends object>(
  filter: TFilterProps<T>,
  filterValue: T[keyof T]
): string => {
  if (filter.type === "input") return filterValue as string;
  else if (filter.type === "selection")
    return filter.options?.find((e) => e.id === filterValue)?.label ?? "";
  else return dayjs(filterValue as Date).format(filter.format ?? "DD/MM/YYYY");
};
