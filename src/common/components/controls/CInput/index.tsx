import { forwardRef } from "react";

import { InputAdornment, TextField } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICInputProps, ICInputRef } from "./types";

export const CInput = forwardRef<ICInputRef, ICInputProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      label,
      className,
      fullWidth = true,
      placeholder,
      rows,
      onKeyDown,
      onEnter,
      error = false,
      errorText = "",
      prefix,
      suffix,
      ...props
    },
    ref
  ) => {
    //#region Event
    const onPresKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
          className={classNames("c-input", className)}
          error={error}
          fullWidth={fullWidth}
          inputRef={ref}
          label={label}
          multiline={!!rows}
          onChange={onChange}
          onKeyDown={onPresKeyDown}
          placeholder={placeholder}
          rows={rows}
          value={value}
          slotProps={{
            inputLabel: {
              className: "c-form-label",
            },
            input: {
              className: "c-outlined-input-root",
              startAdornment: prefix && (
                <InputAdornment position="start">{prefix}</InputAdornment>
              ),
              endAdornment: suffix && (
                <InputAdornment position="end">{suffix}</InputAdornment>
              ),
            },
            htmlInput: {
              className: "c-outlined-input-input",
            },
          }}
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
