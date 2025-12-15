import { forwardRef, useMemo, useState } from "react";

import { InputAdornment, TextField } from "@mui/material";
import classNames from "classnames";
import { toast } from "sonner";

import { ICNumberInputProps, ICNumberInputRef } from "./types";

import { CFormControl } from "../CFormControl";

const INVALID_KEYS = ["+", "e", "E", "-"];

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
      prefix,
      suffix,
      isFloat = false,
      min,
      max,
      ...props
    },
    ref
  ) => {
    //#region Data
    const [isFocus, setIsFocus] = useState(false);

    const displayValue = useMemo(
      () => (value === 0 ? "0" : (value ?? 0)?.toLocaleString()),
      [value]
    );
    //#endregion

    //#region Event
    const onValueChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange?.(Number(event.target.value));
    };

    const onPresKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (INVALID_KEYS.includes(event.key) || (!isFloat && event.key === ".")) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (event.key === "Enter") {
        onEnter?.();
      }
    };

    const onFocus = () => setIsFocus(true);

    const onBlur = () => {
      if (max || min) {
        let numberValue = Number(value);
        if (max && numberValue > max) {
          toast.warning(`Giá trị tối đa: ${max}`);
          onChange?.(max);
        }
        if (min && numberValue < min) {
          toast.warning(`Giá trị tối thiểu: ${min}`);
          onChange?.(min);
        }
      }

      setIsFocus(false);
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <TextField
          {...props}
          className={classNames("c-number-input", className)}
          error={error}
          fullWidth={fullWidth}
          inputRef={ref}
          label={label}
          disabled={disabled}
          type={isFocus ? "number" : "text"}
          value={isFocus ? value : displayValue}
          onChange={onValueChange}
          onKeyDown={onPresKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          slotProps={{
            inputLabel: {
              className: "c-form-label",
            },
            input: {
              className: "c-outlined-input-root",
              inputMode: isFloat ? "decimal" : "numeric",
              startAdornment: prefix && (
                <InputAdornment position="start">{prefix}</InputAdornment>
              ),
              endAdornment: suffix && (
                <InputAdornment position="end">{suffix}</InputAdornment>
              ),
            },
            htmlInput: {
              className: "c-outlined-input-input",
              min: min,
              max: max,
            },
          }}
        />
      </CFormControl>
    );
    //#endregion
  }
);
