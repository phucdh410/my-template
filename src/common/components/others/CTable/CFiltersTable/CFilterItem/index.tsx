import { useMemo, useRef, useState } from "react";

import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { CButton } from "@/components/controls";

import { DatepickerFilter, SelectionFilter, TFilterProps } from "../types";

import { CFilterButton } from "./CFilterButton";
import { CFilterComponent, ICFilterComponentRef } from "./CFilterComponent";
import { CFilterPopover } from "./CFilterPopover";
import { CFilterValueLabel } from "./CFilterValueLabel";
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
  handleFilterItemChange,
}: ICFilterItemProps<T>) => {
  //#region Data
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isExistValue = useMemo(
    () => !!filterValue || filterValue === 0,
    [filterValue]
  );

  const filterComponentRef = useRef<ICFilterComponentRef>(null);
  //#endregion

  //#region Event
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onClear = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    handleFilterItemChange?.(filter.key, "");
  };

  const onSubmit = () => {
    const changedValue = filterComponentRef.current?.takeValue();
    handleFilterItemChange?.(filter.key, changedValue);
    setAnchorEl(null);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CFilterButton
        isExistValue={isExistValue}
        onClick={onClick}
        onClear={onClear}
      >
        {filter.label}
        {isExistValue && (
          <CFilterValueLabel label={displayLabel(filter, filterValue)} />
        )}
      </CFilterButton>
      <CFilterPopover anchorEl={anchorEl} onClose={onClose}>
        <Stack p={2} spacing={1.5}>
          <Typography
            color="black"
            fontSize={14}
            fontWeight={500}
          >{`Lọc theo ${filter.label.toLowerCase()}`}</Typography>
          <CFilterComponent
            ref={filterComponentRef}
            type={filter.type}
            label={filter.label.toLocaleLowerCase()}
            options={(filter as SelectionFilter<T>)?.options}
            views={(filter as DatepickerFilter<T>)?.views}
            format={(filter as DatepickerFilter<T>)?.format}
            onSubmit={onSubmit}
            initialValue={filterValue}
          />
          <CButton onClick={onSubmit}>Áp dụng</CButton>
        </Stack>
      </CFilterPopover>
    </>
  );
  //#endregion
};
