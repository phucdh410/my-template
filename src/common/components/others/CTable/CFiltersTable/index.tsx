import { Stack } from "@mui/material";

import { CButton } from "@/components/controls";
import { generateKey } from "@/funcs";

import { CFilterItem } from "./CFilterItem";
import { ICFiltersTableProps } from "./types";

import { hasDifferentValue } from "../funcs";

export const CFiltersTable = <T extends object>({
  filters,
}: ICFiltersTableProps<T>) => {
  //#region Event
  const onReset = () => {
    filters.onFiltersChange?.(filters.initialValues);
  };

  const handleFilterItemChange = (key: keyof T, value: any) => {
    filters.onFiltersChange({ ...filters.values, [key]: value });
  };
  //#endregion

  //#region Render
  return (
    <Stack width="100%" p={2} gap={2} flexWrap="wrap" direction="row">
      {filters.templates.map((e) => (
        <CFilterItem
          key={generateKey(e.key as keyof T)}
          filter={e}
          filterValue={filters.values[e.key]}
          handleFilterItemChange={handleFilterItemChange}
        />
      ))}
      {hasDifferentValue(filters.values, filters.initialValues) && (
        <CButton variant="text" onClick={onReset}>
          Mặc định
        </CButton>
      )}
    </Stack>
  );
  //#endregion
};
