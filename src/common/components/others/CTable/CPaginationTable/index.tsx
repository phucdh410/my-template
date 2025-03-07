import { memo } from "react";

import { ExpandMore, NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";

import { ICPaginationTableProps } from "./types";

import "./styles.scss";

const total = 402;
const page = 1;
const pages = 41;
const limit = 10;

const LIMIT_OPTIONS = [
  { id: 10, label: 10 },
  { id: 20, label: 20 },
  { id: 50, label: 50 },
  { id: 100, label: 100 },
];

const PaginationTable = ({}: ICPaginationTableProps) => {
  return (
    <Stack
      px={2}
      py={1.25}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className="c-pagination-table"
    >
      <Typography>
        Tổng&nbsp;
        <Typography component="span" fontWeight={500}>
          {total}
        </Typography>
      </Typography>
      <Stack direction="row" alignItems="center" gap={3}>
        <Stack direction="row" alignItems="center">
          Số dòng mỗi trang
          <Select
            value={limit}
            className="c-table-limit-select"
            IconComponent={ExpandMore}
          >
            {LIMIT_OPTIONS.map((e, i) => (
              <MenuItem key={e.id} value={e.id}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack>
          Trang {page}/{pages}
        </Stack>
        <Stack direction="row">
          <IconButton size="small" disabled={page === 1 ?? false}>
            <NavigateBefore />
          </IconButton>
          <IconButton size="small" disabled={page === pages ?? false}>
            <NavigateNext />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const CPaginationTable = memo(PaginationTable);
