import { forwardRef, useMemo } from "react";

import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";

import { CFormControl } from "../CFormControl";

import { ICDatePickerProps, ICDatePickerRef } from "./types";

export const CDatePicker = forwardRef<ICDatePickerRef, ICDatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      placeholder,
      views = undefined,
      format = "DD/MM/YYYY",
      disabled = false,
      disablePast = false,
      disableFuture = false,
      error = false,
      errorText = "",
      reduceAnimations = true,
      hidePickerIcon = false,
      fullWidth = true,
      showDaysOutsideCurrentMonth = false,
      minDate = dayjs().subtract(10, "year").startOf("year"),
      maxDate = dayjs().add(10, "year").endOf("year"),
      ...props
    },
    ref
  ) => {
    //#region Data
    const currentValue = useMemo(() => {
      if (!value) return null;
      return dayjs(value);
    }, [value]);
    //#endregion

    //#region Event
    const onValueChange = (
      newValue: Dayjs | null,
      context: PickerChangeHandlerContext<DateValidationError>
    ) => {
      if (newValue) {
        const result = dayjs(newValue).toDate();
        onChange?.(result);
      } else {
        onChange?.(null);
      }
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <DatePicker
          {...props}
          label={label}
          dayOfWeekFormatter={(date) => date.format("dd")}
          reduceAnimations
          minDate={minDate}
          maxDate={maxDate}
          value={currentValue}
          onChange={onValueChange}
          views={views}
          format={format}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          disabled={disabled}
          disablePast={disablePast}
          disableFuture={disableFuture}
          className={classNames("c-date-picker", className)}
          slotProps={{
            textField: {
              placeholder: placeholder ?? format,
              fullWidth,
              error,
            },
            inputAdornment: {
              sx: { display: hidePickerIcon ? "none" : "flex" },
            },
          }}
        />
      </CFormControl>
    );
    //#endregion
  }
);
