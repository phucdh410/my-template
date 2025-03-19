import { useCallback, useEffect, useRef, useState } from "react";

import {
  Box,
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
import { CPaginationTable } from "./CPaginationTable";
import {
  useCalculatePinPositions,
  useDetectScrollbar,
  useTableScrollShadow,
} from "./hooks";
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
  pagination,
}: ICTableProps<T, F>) => {
  //#region Data
  const bodyContainerRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useTableScrollShadow(bodyContainerRef, tableRef);
  const { hasVertical } = useDetectScrollbar(bodyContainerRef);

  const { pinPositions } = useCalculatePinPositions(headers);

  const [widthCols, setWidthCols] = useState<number[]>([]);
  //#endregion

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!tableRef.current || !headerContainerRef.current) return;
      const headerContainer = headerContainerRef.current;
      const table = tableRef.current;

      const headerRow = headerContainer.querySelector("table thead tr");
      const firstRow = table.querySelector("tbody tr");
      if (firstRow && headerRow) {
        const newWidths: number[] = [];
        const headerColumns = headerRow.querySelectorAll("th");
        const bodyColumns = firstRow.querySelectorAll("td");
        for (let i = 0; i < bodyColumns.length; i++) {
          const headerCellWidth =
            headerColumns[i].getBoundingClientRect().width;
          const bodyCellWidth = bodyColumns[i].getBoundingClientRect().width;
          newWidths.push(Math.max(headerCellWidth, bodyCellWidth));
        }
        setWidthCols(newWidths);
      }
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      divider={<Divider />}
    >
      <Stack width="100%" height={40}></Stack>
      {filters && <CFiltersTable filters={filters} />}
      <Stack>
        <Box
          ref={headerContainerRef}
          className="table-header-container"
          overflow="auto"
          sx={{ scrollbarWidth: "none" }}
        >
          <Table sx={{ tableLayout: "fixed", width: "max-content" }}>
            <colgroup>
              {headers.map((headerCol, headerColIndex) => {
                const isLastCol = headerColIndex === headers.length - 1;
                const baseWidth = headerCol.width ?? widthCols[headerColIndex];
                return (
                  <col
                    key={generateKey(headerCol.key)}
                    width={
                      hasVertical && isLastCol ? baseWidth + 15 : baseWidth
                    }
                  />
                );
              })}
            </colgroup>
            <TableHead className="c-table-head">
              <TableRow className="c-table-head--row">
                {headers.map((header, headerIndex) => (
                  <TableCell
                    key={generateKey(header.key)}
                    align={header.align ?? "center"}
                    className={classNames(
                      "c-table-head--cell",
                      header.className,
                      {
                        "pin-left": header.pin === "left",
                        "pin-right": header.pin === "right",
                        "pin-left-last":
                          header.pin === "left" &&
                          header.key === pinPositions?.leftLastKey,
                        "pin-right-first":
                          header.pin === "right" &&
                          header.key === pinPositions?.rightFirstKey,
                      }
                    )}
                    style={{
                      textTransform: headerTransform ? headerTransform : "none",
                      position: header.pin ? "sticky" : undefined,
                      zIndex: header.pin ? 4 : 3,
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
          </Table>
        </Box>
        <TableContainer
          ref={bodyContainerRef}
          className="c-table-container table-body-container"
          sx={{ height }}
          onScroll={() => {
            const headerEl = headerContainerRef.current;
            const bodyEl = bodyContainerRef.current;
            if (headerEl && bodyEl) {
              headerEl.scrollLeft = bodyEl.scrollLeft;
            }
          }}
        >
          <Table
            ref={tableRef}
            className="c-table"
            stickyHeader={stickyHeader}
            sx={{ tableLayout: "auto", width: "max-content", minWidth: "100%" }}
          >
            <colgroup>
              {headers.map((headerCol, headerColIndex) => (
                <col
                  key={generateKey(headerCol.key)}
                  width={headerCol.width ?? widthCols[headerColIndex]}
                />
              ))}
            </colgroup>
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
                      className={classNames("c-table-body--cell", {
                        "pin-left": header.pin === "left",
                        "pin-right": header.pin === "right",
                        "pin-left-last":
                          header.pin === "left" &&
                          header.key === pinPositions?.leftLastKey,
                        "pin-right-first":
                          header.pin === "right" &&
                          header.key === pinPositions?.rightFirstKey,
                      })}
                      style={{
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

      {pagination && <CPaginationTable {...pagination} />}
    </Stack>
  );
  //#endregion
};
