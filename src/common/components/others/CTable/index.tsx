import { useCallback, useMemo, useRef } from "react";

import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";

import { generateKey } from "@/funcs";

import { CFiltersTable } from "./CFiltersTable";
import { ICTableProps, TColumnTypes } from "./types";

export const CTable = <T extends object, F extends object>({
  headers = [],
  data = [],
  loading = false,
  rowKey = "id",
  headerTransform,
  stickyHeader,
  height,
  hover = true,
  filters,
}: ICTableProps<T, F>) => {
  //#region Data
  const tableRef = useRef<HTMLTableElement>(null);

  const pinPositions = useMemo(() => {
    if (!headers.some((header) => header.pin)) return null;
    let leftOffset = 0;
    const left: Record<string, string> = {};

    let rightOffset = 0;
    const right: Record<string, string> = {};

    headers.forEach((header, index) => {
      if (header.pin === "left") {
        left[header.key] = `${leftOffset}px`;
        leftOffset += header.width;
      } else if (header.pin === "right") {
        right[header.key] = `${rightOffset}px`;
        rightOffset += header.width;
      }
    });

    return { left, right };
  }, [headers]);
  //#endregion

  //#region Event
  const renderValueByColumnType = useCallback(
    (value: any, columnType: TColumnTypes) => {
      switch (columnType) {
        case "number":
          return value?.toLocaleString();
        case "date":
          return dayjs(value).format("DD/MM/YYYY");
        case "datetime":
          return dayjs(value).format("DD/MM/YYYY HH:mm:ss");
        default:
          return value;
      }
    },
    []
  );
  //#endregion

  //#region Render
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      borderRadius="20px"
      boxShadow="rgba(0, 0, 0, 0.04) 0px 5px 22px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      overflow="hidden"
    >
      <Stack width="100%" height={40}></Stack>
      <Divider />
      {filters && <CFiltersTable filters={filters} />}
      <TableContainer className="c-table-container" sx={{ height }}>
        <Table ref={tableRef} className="c-table" stickyHeader={stickyHeader}>
          <TableHead className="c-table-head">
            <TableRow className="c-table-head--row">
              {headers.map((header, headerIndex) => (
                <TableCell
                  key={generateKey(header.key)}
                  align={header.align ?? "center"}
                  className={classNames(
                    "c-table-head--cell",
                    header.className,
                    header.pin &&
                      (header.pin === "left" ? "pin-left" : "pin-right")
                  )}
                  style={{
                    textTransform: headerTransform ? headerTransform : "none",
                    width: header.width ? header.width : "auto",
                    minWidth: header.width ? header.width : "auto",
                    position: header.pin ? "sticky" : undefined,
                    zIndex: header.pin ? 3 : 1,
                    ...(header.pin && header.pin === "left"
                      ? { left: pinPositions?.left[header.key] }
                      : { right: pinPositions?.right[header.key] }),
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="c-table-body">
            {data.map((row, rowIndex) => (
              <TableRow
                key={generateKey(row[rowKey as keyof T])}
                hover={hover}
                className="c-table-body--row"
              >
                {headers.map((header, columnIndex) => (
                  <TableCell
                    key={generateKey(header.key)}
                    align={header.align ?? "center"}
                    className={classNames(
                      "c-table-body--cell",
                      header.pin &&
                        (header.pin === "left" ? "pin-left" : "pin-right")
                    )}
                    style={{
                      width: header.width ? header.width : "auto",
                      minWidth: header.width ? header.width : "auto",
                      position: header.pin ? "sticky" : undefined,
                      zIndex: header.pin ? 2 : 1,
                      ...(header.pin && header.pin === "left"
                        ? { left: pinPositions?.left[header.key] }
                        : { right: pinPositions?.right[header.key] }),
                    }}
                  >
                    {header.renderCell
                      ? header.renderCell(
                          row[header.key as keyof T],
                          row,
                          rowIndex
                        )
                      : header.valueFormatter
                      ? header.valueFormatter(
                          row[header.key as keyof T],
                          row,
                          rowIndex
                        )
                      : header.columnType
                      ? renderValueByColumnType(
                          row[header.key as keyof T],
                          header.columnType
                        )
                      : row[header.key as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
  //#endregion
};
