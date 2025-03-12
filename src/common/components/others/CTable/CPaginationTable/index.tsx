import { memo, useCallback } from "react";

import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

import { CSelectLimit } from "./CSelectLimit";
import { ICPaginationTableProps } from "./types";

import "./styles.scss";

const PaginationTable = ({
  page = 1,
  pages = 0,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: ICPaginationTableProps) => {
  //#region Event
  const onPrev = useCallback(() => {
    onPageChange?.(page - 1);
  }, [page, onPageChange]);

  const onNext = useCallback(() => {
    onPageChange?.(page + 1);
  }, [page, onPageChange]);
  //#endregion

  //#region Render
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
        {total && (
          <>
            Tổng&nbsp;
            <Typography component="span" fontWeight={500}>
              {total}
            </Typography>
          </>
        )}
      </Typography>
      <Stack direction="row" alignItems="center" gap={3}>
        <CSelectLimit limit={limit} onLimitChange={onLimitChange} />
        <Stack>
          Trang {page}/{pages}
        </Stack>
        <Stack direction="row">
          <IconButton
            size="small"
            onClick={onPrev}
            disabled={page === 1 || false}
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            size="small"
            onClick={onNext}
            disabled={page === pages || false}
          >
            <NavigateNext />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
  //#endregion
};

export const CPaginationTable = memo(PaginationTable);
