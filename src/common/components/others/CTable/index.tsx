import { useCallback } from "react";

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

import { ICTableProps, TColumnTypes } from "./types";

export const CTable: React.FC<ICTableProps> = ({
  headers = [],
  data = [],
  loading = false,
  rowKey = "id",
  headerTransform,
  stickyHeader,
}) => {
  //#region Data
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
      <TableContainer className="c-table-container">
        <Table className="c-table" stickyHeader={stickyHeader}>
          <TableHead className="c-table-head">
            <TableRow className="c-table-head--row">
              {headers.map((header) => (
                <TableCell
                  key={generateKey(header.key)}
                  align={header.align ?? "center"}
                  className={classNames("c-table-head--cell", header.className)}
                  style={{
                    textTransform: headerTransform ? headerTransform : "none",
                    width: header.width ? header.width : "auto",
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="c-table-body">
            {data.map((row, rowIndex) => (
              <TableRow key={generateKey(row.id)} className="c-table-body--row">
                {headers.map((header, headerIndex) => (
                  <TableCell
                    key={generateKey(header.key)}
                    align={header.align ?? "center"}
                    className="c-table-body--cell"
                    style={{
                      width: header.width ? header.width : "auto",
                    }}
                  >
                    {header.renderCell
                      ? header.renderCell(row[header.key], row, rowIndex)
                      : header.valueFormatter
                      ? header.valueFormatter(row[header.key], row, rowIndex)
                      : header.columnType
                      ? renderValueByColumnType(
                          row[header.key],
                          header.columnType
                        )
                      : row[header.key]}
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
