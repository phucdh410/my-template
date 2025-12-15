import { forwardRef, useMemo, useRef } from "react";

import { HighlightOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import classNames from "classnames";

import { CPickerModal } from "./CPickerModal";
import { dateRangeValueFormatter } from "./funcs";
import {
  ICDateRangePickerProps,
  ICDateRangePickerRef,
  ICDateRangeValues,
  ICPickerModalRef,
} from "./types";

import { CFormControl } from "../CFormControl";

import "./styles.scss";

export const CDateRangePicker = forwardRef<
  ICDateRangePickerRef,
  ICDateRangePickerProps
>(
  (
    {
      value,
      onChange,
      disabled = false,
      error = false,
      errorText = "",
      className,
      fullWidth = true,
      label,
      placeholder,
      ...props
    },
    ref
  ) => {
    //#region Data
    const displayValue = useMemo(() => dateRangeValueFormatter(value), [value]);

    const modalRef = useRef<ICPickerModalRef>(null);
    //#endregion

    //#region Event
    const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      event.currentTarget?.blur();
      modalRef.current?.open(value);
    };

    const onValueChange = (values: ICDateRangeValues) => {
      onChange?.(values);
    };

    const onClear = () => onChange?.({ from: null, to: null });
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <TextField
          {...props}
          label={label}
          className={classNames("c-date-range-picker", className)}
          fullWidth={fullWidth}
          inputRef={ref}
          disabled={disabled}
          // onChange={onChange}
          placeholder={placeholder}
          value={displayValue}
          error={error}
          focused={false}
          onFocus={onFocus}
          slotProps={{
            inputLabel: {
              className: "c-form-label",
            },
            input: {
              className: "c-outlined-input-root",
              endAdornment: displayValue ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={onClear}>
                    <HighlightOffOutlined fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
            htmlInput: {
              className: "c-outlined-input-input",
            },
          }}
        />

        <CPickerModal ref={modalRef} onChange={onValueChange} />
      </CFormControl>
    );
    //#endregion
  }
);
