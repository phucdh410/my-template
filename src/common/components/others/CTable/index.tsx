import { useCallback, useMemo, useState } from "react";

import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Button,
  Divider,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";

import { generateKey } from "@/funcs";

import { ICTableProps, TColumnTypes, TFilterProps } from "./types";

export const CTable = <T extends object>({
  headers = [],
  data = [],
  loading = false,
  rowKey = "id",
  headerTransform,
  stickyHeader,
  height,
  hover = true,
  filters = [],
}: ICTableProps<T>) => {
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
      {filters.length > 0 && (
        <>
          <Stack width="100%" p={2} gap={2} flexWrap="wrap" direction="row">
            {filters.map((e) => (
              <CFilterItem key={e.key} filter={e} />
            ))}
          </Stack>
          <Divider />
        </>
      )}
      <TableContainer className="c-table-container" sx={{ height }}>
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
                    minWidth: header.width ? header.width : "auto",
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
                    className="c-table-body--cell"
                    style={{
                      width: header.width ? header.width : "auto",
                      minWidth: header.width ? header.width : "auto",
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

interface ICFilterItemProps {
  filter: TFilterProps;
}
export const CFilterItem = ({ filter }: ICFilterItemProps) => {
  //#region Data
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isExistValue = useMemo(
    () => filter.value || filter.value === 0,
    [filter]
  );
  //#endregion

  //#region Event
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(null);

  const onClear = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    filter.onFilter?.(filter.key, "");
  };
  //#endregion

  //#region Render
  return (
    <>
      <Button
        variant="outlined"
        className="c-table-filter--button"
        startIcon={
          isExistValue ? (
            <RemoveCircleOutline onClick={onClear} />
          ) : (
            <AddCircleOutline />
          )
        }
        onClick={onClick}
      >
        {filter.label}
        {isExistValue && (
          <>
            :&nbsp;
            <Typography
              color="primary"
              component="span"
              fontWeight={500}
              fontSize={15}
            >
              {displayLabel(filter)}
            </Typography>
          </>
        )}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 280,
              mt: 0.5,
              borderRadius: "12px",
              border: "1px solid black",
              borderColor: (theme) => theme.palette.divider,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            },
          },
        }}
      >
        <Stack p={2} gap={2}>
          <Typography
            color="black"
            fontSize={14}
            fontWeight={500}
          >{`Lọc theo ${filter.label.toLowerCase()}`}</Typography>
          {/* {filter.type === "input" && (
            <CInputFilter filter={filter} onClose={onClose} />
          )}
          {filter.type === "selection" && (
            <CSelectionFilter filter={filter} onClose={onClose} />
          )}
          {filter.type === "datepicker" && (
            <CDatepickerFilter filter={filter} onClose={onClose} />
          )} */}
        </Stack>
      </Popover>
    </>
  );
  //#endregion
};

const displayLabel = (filter: TFilterProps): string => {
  if (filter.type === "input") return filter.value;
  else if (filter.type === "selection")
    return filter.options?.find((e) => e.id === filter.value)?.label ?? "";
  else return dayjs(filter.value).format("DD/MM/YYYY");
};
