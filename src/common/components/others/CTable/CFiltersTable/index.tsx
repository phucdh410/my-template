import { useCallback } from "react";

import { Divider, Stack } from "@mui/material";

import { CButton } from "@/components/controls";
import { generateKey } from "@/funcs";

import { CFilterItem } from "./CFilterItem";
import { ICFiltersTableProps } from "./types";

export const CFiltersTable = <T extends object>({
  filters,
}: ICFiltersTableProps<T>) => {
  //#region Event
  const onReset = useCallback(() => {
    filters.onFiltersChange?.(filters.initialValues);
  }, [filters.initialValues, filters.onFiltersChange]);

  const onFilterFieldChange = useCallback(
    (key: keyof T, value: any) => {
      filters.onFiltersChange({ ...filters.values, [key]: value });
    },
    [filters]
  );
  //#endregion

  //#region Render
  return (
    <>
      <Stack width="100%" p={2} gap={2} flexWrap="wrap" direction="row">
        {filters.templates.map((e) => (
          <CFilterItem
            key={generateKey(e.key as keyof T)}
            filter={e}
            filterValue={filters.values[e.key]}
            onFilterFieldChange={onFilterFieldChange}
          />
        ))}
        {filters.values !== filters.initialValues && (
          <CButton variant="text" onClick={onReset}>
            Mặc định
          </CButton>
        )}
      </Stack>
      <Divider />
    </>
  );
  //#endregion
};
