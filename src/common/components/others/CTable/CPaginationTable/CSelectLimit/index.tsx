import { ExpandMore } from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";

import { ICSelectLimitProps } from "./types";

import { LIMIT_VALUES } from "../types";

import { LIMIT_OPTIONS } from "../../variables";

export const CSelectLimit = ({
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
