import { forwardRef, useMemo } from "react";

import { InputAdornment, TextField } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICNumberInputProps, ICNumberInputRef } from "./types";

export const CNumberInput = forwardRef<ICNumberInputRef, ICNumberInputProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      label,
      className,
      fullWidth = true,
      placeholder,
      onKeyDown,
      onEnter,
      error = false,
      errorText = "",
      suffix,
      isFloat = false,
      min,
      max,
      ...props
    },
    ref
  ) => {
    //#region Data
    const currentValue = useMemo(
      () => (Number(value) ?? 0).toLocaleString(),
      [value]
    );
    //#endregion

    //#region Event
    const onValueChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const changedValue = event.target.value;
      const getDigit = changedValue.replace(/\D/g, "");
      const newValue = Number(getDigit);

      if (typeof min !== "undefined" && newValue < min) return onChange?.(min);
      if (typeof max !== "undefined" && newValue > max) return onChange?.(max);

      onChange?.(Number(getDigit));
    };

    const onPresKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const step = event.key === "ArrowUp" ? 1 : -1;
        const newValue = Number(value) + step;
        if (typeof min !== "undefined" && newValue < min) return;
        if (typeof max !== "undefined" && newValue > max) return;
        onChange?.(newValue);
        return;
      }

      onKeyDown?.(event);

      if (event.key === "Enter") {
        onEnter?.();
      }
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <TextField
          className={classNames("c-input c-number-input", className)}
          error={error}
          fullWidth={fullWidth}
          inputRef={ref}
          label={label}
          onChange={onValueChange}
          onKeyDown={onPresKeyDown}
          placeholder={placeholder}
          value={currentValue}
          slotProps={{
            input: {
              inputMode: isFloat ? "decimal" : "numeric",
              endAdornment: suffix && (
                <InputAdornment position="end">{suffix}</InputAdornment>
              ),
            },
          }}
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
