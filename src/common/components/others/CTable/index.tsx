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
  const { pinPositions } = useCalculatePinPositions(headers, selectable);
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

  const renderColGroup = useCallback(() => {
    return (
      <colgroup>
        {selectable && <col width={70} />}
        {headers.map((headerCol, headerColIndex) => (
          <col
            key={generateKey(headerCol.key)}
            width={headerCol.width ?? widthCols[headerColIndex]}
          />
        ))}
      </colgroup>
    );
  }, [selectable, headers, widthCols]);
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
                    headerKey="selectable-col"
                    className="selection-cell"
                    pin="left"
                    pinPositions={pinPositions}
                  >
                    <CCheckbox
                      value={isCheckAll ?? false}
                      isIndeterminate={isIndeterminate}
                      onChange={onCheck?.()}
                    />
                  </CTableCell>
                )}
                {headers.map((header, headerIndex) => (
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
                      headerKey="selectable-col"
                      className="selection-cell"
                      pin="left"
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
                  {headers.map((header, columnIndex) => (
                    <CTableCell
                      key={generateKey(header.key)}
                      headerKey={header.key}
                      align={header.align}
                      className={header.className}
                      pin={header.pin}
                      pinPositions={pinPositions}
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
