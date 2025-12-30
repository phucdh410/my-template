import { Fragment, useRef } from "react";

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
import dayjs from "dayjs";

import { CCheckbox } from "@/components/controls";
import { generateKey } from "@/funcs";

import { CTableCell } from "./CCell";
import { CFiltersTable } from "./CFiltersTable";
import { CPaginationTable } from "./CPaginationTable";
import {
  useCalculatePinPositions,
  useDetectScrollbar,
  useTableColumnsWidth,
  useTableScrollShadow,
} from "./hooks";
import { ICTableProps, TColumnTypes } from "./types";
import { SELECTION_COL_KEY, SELECTION_COL_WIDTH } from "./variables";

export const CTable = <
  T extends object,
  F extends object = Record<string, any>
>({
  columns = [],
  data = [],
  loading = false,
  rowKey = "id",
  headerTransform,
  stickyHeader,
  height,
  hover = true,
  filters,
  pagination,
  selectable = false,
  selections = [],
  isCheckAll = false,
  isIndeterminate = false,
  onCheck,
}: ICTableProps<T, F>) => {
  //#region Data
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const bodyContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useTableScrollShadow(tableWrapperRef, bodyContainerRef);
  const { hasVertical } = useDetectScrollbar(bodyContainerRef);
  const { pinPositions } = useCalculatePinPositions(columns, selectable);
  const { widthCols } = useTableColumnsWidth(
    headerContainerRef,
    tableRef,
    data
  );
  //#endregion

  //#region Event
  const renderValue = (value: any, columnType?: TColumnTypes) => {
    if (value === null) return "";

    if (columnType) {
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
    } else {
      return value;
    }
  };

  const onTableSroll = () => {
    const headerEl = headerContainerRef.current;
    const bodyEl = bodyContainerRef.current;
    if (headerEl && bodyEl) {
      headerEl.scrollLeft = bodyEl.scrollLeft;
    }
  };

  const renderColGroup = () => {
    return (
      <colgroup>
        {selectable && (
          <col
            width={SELECTION_COL_WIDTH}
            style={{ width: `${SELECTION_COL_WIDTH}px` }}
          />
        )}
        {columns.map((headerCol, headerColIndex) => (
          <col
            key={generateKey(headerCol.key)}
            style={{
              width: `${headerCol.width ?? widthCols[headerColIndex]}px`,
            }}
          />
        ))}
      </colgroup>
    );
  };
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
            {renderColGroup()}
            <TableHead className="c-table-head">
              <TableRow className="c-table-head--row">
                {selectable && (
                  <CTableCell
                    isHeader
                    selectable
                    pin="left"
                    headerKey={SELECTION_COL_KEY}
                    pinPositions={pinPositions}
                  >
                    <CCheckbox
                      value={isCheckAll ?? false}
                      isIndeterminate={isIndeterminate}
                      onChange={onCheck?.()}
                    />
                  </CTableCell>
                )}
                {columns.map((header, headerIndex) => (
                  <Fragment key={generateKey(header.key)}>
                    <CTableCell
                      isHeader
                      align={header.align}
                      headerKey={header.key}
                      className={header.className}
                      headerTransform={headerTransform}
                      pin={header.pin}
                      pinPositions={pinPositions}
                    >
                      {header.label}
                    </CTableCell>
                    {headerIndex === columns.length - 1 && hasVertical && (
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
          sx={{ height, scrollBehavior: "smooth" }}
          onScroll={onTableSroll}
        >
          <Table
            ref={tableRef}
            className="c-table"
            stickyHeader={stickyHeader}
            sx={{ tableLayout: "auto", width: "max-content", minWidth: "100%" }}
          >
            {renderColGroup()}
            <TableBody className="c-table-body">
              {data.map((row, rowIndex) => (
                <TableRow
                  key={generateKey(row[rowKey as keyof T])}
                  hover={hover}
                  className="c-table-body--row"
                >
                  {selectable && (
                    <CTableCell
                      selectable
                      pin="left"
                      headerKey={SELECTION_COL_KEY}
                      pinPositions={pinPositions}
                    >
                      <CCheckbox
                        value={selections.includes(
                          row[rowKey as keyof T] as string
                        )}
                        onChange={onCheck?.(row[rowKey as keyof T] as string)}
                      />
                    </CTableCell>
                  )}
                  {columns.map((column, columnIndex) => (
                    <CTableCell
                      key={generateKey(column.key)}
                      headerKey={column.key}
                      align={column.align}
                      className={column.className}
                      pin={column.pin}
                      pinPositions={pinPositions}
                    >
                      {column.render
                        ? column.render(
                            row[column.key as keyof T],
                            row,
                            rowIndex
                          )
                        : column.valueFormatter
                        ? column.valueFormatter(
                            row[column.key as keyof T],
                            row,
                            rowIndex
                          )
                        : renderValue(
                            column.dataIndex
                              ? row[column.dataIndex as keyof T]
                              : null,
                            column.columnType
                          )}
                    </CTableCell>
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
