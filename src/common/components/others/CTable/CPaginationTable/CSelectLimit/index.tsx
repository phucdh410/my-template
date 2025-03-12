import { memo } from "react";

import { ExpandMore } from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";

import { LIMIT_VALUES } from "../types";

import { ICSelectLimitProps } from "./types";

const LIMIT_OPTIONS: { id: LIMIT_VALUES; label: number }[] = [
  { id: 10, label: 10 },
  { id: 20, label: 20 },
  { id: 50, label: 50 },
  { id: 100, label: 100 },
];

export const SelectLimit = ({
  limit = 10,
  onLimitChange,
}: ICSelectLimitProps) => {
  //#region Event
  const onChange = (
    event: SelectChangeEvent<number>,
    child: React.ReactNode
  ) => {
    onLimitChange?.(Number(event.target.value) as LIMIT_VALUES);
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="row" alignItems="center">
      Số dòng mỗi trang:&nbsp;
      <Select
        value={limit}
        onChange={onChange}
        className="c-table-limit-select"
        IconComponent={ExpandMore}
        MenuProps={{
          className: "c-table-limit-select--menu",
          anchorOrigin: { horizontal: "center", vertical: "center" },
          transformOrigin: { horizontal: "center", vertical: "center" },
        }}
      >
        {LIMIT_OPTIONS.map((e, i) => (
          <MenuItem key={e.id} value={e.id}>
            {e.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
  //#endregion
};

export const CSelectLimit = memo(SelectLimit);
