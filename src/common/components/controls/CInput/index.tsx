import { forwardRef } from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { InputAdornment, TextField } from "@mui/material";
import classNames from "classnames";

import { ICFormInputProps, ICInputProps, ICInputRef } from "./types";

import { CFormControl } from "../CFormControl";

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

export const CFormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  ComponentProps,
}: ICFormInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <CInput
          {...field}
          error={!!error}
          errorText={error?.message}
          {...ComponentProps}
        />
      )}
    />
  );
};
