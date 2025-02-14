import { forwardRef } from "react";

import { TextField } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICInputProps, ICInputRef } from "./types";

export const CInput = forwardRef<ICInputRef, ICInputProps>(
  (
    {
      label,
      className,
      fullWidth = true,
      placeholder,
      error,
      errorText,
      ...props
    },
    ref
  ) => {
    return (
      <CFormControl error={error} errorText={errorText}>
        <TextField
          className={classNames("c-input", className)}
          label={label}
          placeholder={placeholder}
          fullWidth={fullWidth}
        />
      </CFormControl>
    );
  }
);
