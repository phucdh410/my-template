import { useMemo, useState } from "react";

import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, Popover, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import {
  CAutocomplete,
  CButton,
  CDatePicker,
  CInput,
} from "@/components/controls";

import { TFilterProps } from "../types";

import { ICFilterItemProps } from "./types";

const displayLabel = <T extends object>(
  filter: TFilterProps<T>,
  filterValue: T[keyof T]
): string => {
  if (filter.type === "input") return filterValue as string;
  else if (filter.type === "selection")
    return filter.options?.find((e) => e.id === filterValue)?.label ?? "";
  else return dayjs(filterValue as Date).format(filter.format ?? "DD/MM/YYYY");
};

export const CFilterItem = <T extends object>({
  filter,
  filterValue,
  onFilterFieldChange,
}: ICFilterItemProps<T>) => {
  //#region Data
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isExistValue = useMemo(
    () => filterValue || filterValue === 0,
    [filterValue]
  );
  const [value, setValue] = useState(filterValue ?? "");
  //#endregion

  //#region Event
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
    setValue(filterValue ?? "");
  };

  const onClear = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    onFilterFieldChange?.(filter.key, "");
  };

  const onChange = (value: any) => {
    setValue(value);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = () => {
    onFilterFieldChange?.(filter.key, value);
    setAnchorEl(null);
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
              {displayLabel(filter, filterValue)}
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
              width: 320,
              mt: 0.5,
              borderRadius: "12px",
              border: "1px solid black",
              borderColor: (theme) => theme.palette.divider,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            },
          },
        }}
      >
        <Stack p={2} spacing={1.5}>
          <Typography
            color="black"
            fontSize={14}
            fontWeight={500}
          >{`Lọc theo ${filter.label.toLowerCase()}`}</Typography>
          {filter.type === "input" && (
            <CInput
              value={value}
              onChange={onInputChange}
              placeholder={`Nhập ${filter.label.toLowerCase()}`}
              onEnter={onSubmit}
            />
          )}
          {filter.type === "selection" && (
            <CAutocomplete
              value={value}
              onChange={onChange}
              placeholder={`Chọn ${filter.label.toLowerCase()}`}
              options={filter.options ?? []}
            />
          )}
          {filter.type === "datepicker" && (
            <CDatePicker
              value={(value as unknown as Date) || null}
              onChange={onChange}
              views={filter.views}
              format={filter.format}
            />
          )}
          <CButton onClick={onSubmit}>Áp dụng</CButton>
        </Stack>
      </Popover>
    </>
  );
  //#endregion
};
