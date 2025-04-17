import { Fragment, useCallback, useRef } from "react";

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
  useTableColumnsWidth,
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
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const bodyContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useTableScrollShadow(tableWrapperRef, bodyContainerRef);
  const { hasVertical } = useDetectScrollbar(bodyContainerRef);
  const { pinPositions } = useCalculatePinPositions(headers);
  const { widthCols } = useTableColumnsWidth(
    headerContainerRef,
    tableRef,
    data
  );
  //#endregion

  //#region Event
  const renderValueByColumnType = useCallback(
    (value: any, columnType: TColumnTypes) => {
      switch (columnType) {
        case "number":
          return (value ?? 0)?.toLocaleString();
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

  const onTableSroll = useCallback(() => {
    const headerEl = headerContainerRef.current;
    const bodyEl = bodyContainerRef.current;
    if (headerEl && bodyEl) {
      headerEl.scrollLeft = bodyEl.scrollLeft;
    }
  }, []);
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
      <Stack className="c-table-wrapper" ref={tableWrapperRef}>
        <Box
          ref={headerContainerRef}
          className="table-header-container"
          overflow="hidden"
        >
          <Table
            className="c-table"
            sx={{ tableLayout: "fixed", width: "max-content" }}
          >
            <colgroup>
              {headers.map((headerCol, headerColIndex) => (
                <col
                  key={generateKey(headerCol.key)}
                  width={headerCol.width ?? widthCols[headerColIndex]}
                />
              ))}
            </colgroup>
            <TableHead className="c-table-head">
              <TableRow className="c-table-head--row">
                {headers.map((header, headerIndex) => (
                  <Fragment key={generateKey(header.key)}>
                    <TableCell
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
                        textTransform: headerTransform
                          ? headerTransform
                          : "none",
                        position: header.pin ? "sticky" : undefined,
                        zIndex: header.pin ? 4 : 3,
                        ...(header.pin && header.pin === "left"
                          ? { left: pinPositions?.left[header.key] }
                          : { right: pinPositions?.right[header.key] }),
                      }}
                    >
                      {header.label}
                    </TableCell>
                    {headerIndex === headers.length - 1 && hasVertical && (
                      <TableCell className="c-table-head--cell scrollbar-cell" />
                    )}
                  </Fragment>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </Box>
        <TableContainer
          ref={bodyContainerRef}
          className="table-body-container"
          sx={{ height }}
          onScroll={onTableSroll}
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
