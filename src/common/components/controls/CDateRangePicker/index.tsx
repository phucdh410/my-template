import { forwardRef, useRef, useState } from "react";

import { HighlightOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";

import { CFormControl } from "../CFormControl";

import { CPickerModal } from "./CPickerModal";
import {
  ICDateRangePickerProps,
  ICDateRangePickerRef,
  ICDateRangeValues,
  ICPickerModalRef,
} from "./types";

import "./styles.scss";

export const CDateRangePicker = forwardRef<
  ICDateRangePickerRef,
  ICDateRangePickerProps
>(
  (
    {
      error,
      errorText,
      className,
      fullWidth,
      label,
      placeholder,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    //#region Data
    const [displayValue, setDisplayValue] = useState("");

    const modalRef = useRef<ICPickerModalRef>(null);
    //#endregion

    //#region Event
    const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      event.currentTarget?.blur();
      modalRef.current?.open();
    };

    const onValueChange = (values: ICDateRangeValues) => {
      const { from, to } = values;
      let text = "";

      const sameYear = dayjs(from).isSame(to, "year");
      const sameMonth = dayjs(from).isSame(to, "month");
      const sameDate = dayjs(from).isSame(to, "date");

      if (sameYear) {
        if (sameMonth) {
          if (sameDate) {
            // Same year, same month, same day
            text = dayjs(from).format("D MMMM YYYY");
          } else {
            // Same year, same month, different days
            text = `${dayjs(from).format("D")} - ${dayjs(to).format(
              "D MMMM YYYY"
            )}`;
          }
        } else {
          // Same year, different months
          text = `${dayjs(from).format("D MMMM")} - ${dayjs(to).format(
            "D MMMM YYYY"
          )}`;
        }
      } else {
        // Different years
        text = `${dayjs(from).format("D MMMM YYYY")} - ${dayjs(to).format(
          "D MMMM YYYY"
        )}`;
      }

      setDisplayValue(text);
    };

    const onClear = () => setDisplayValue("");
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <TextField
          className={classNames("c-input c-date-range-picker", className)}
          error={error}
          fullWidth={fullWidth}
          inputRef={ref}
          label={label}
          // onChange={onChange}
          placeholder={placeholder}
          value={displayValue}
          slotProps={{
            inputLabel: {
              className: "c-form-label",
            },
            input: {
              endAdornment: displayValue ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={onClear}>
                    <HighlightOffOutlined fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
          {...props}
          focused={false}
          onFocus={onFocus}
        />

        <CPickerModal ref={modalRef} onChange={onValueChange} />
      </CFormControl>
    );
    //#endregion
  }
);
