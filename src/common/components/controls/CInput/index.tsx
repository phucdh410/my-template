import { forwardRef } from "react";

import { TextField } from "@mui/material";
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
          inputRef={ref}
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          fullWidth={fullWidth}
          error={error}
          multiline={!!rows}
          rows={rows}
          onKeyDown={onPresKeyDown}
          {...props}
        />
      </CFormControl>
    );
    //#endregion
  }
);
