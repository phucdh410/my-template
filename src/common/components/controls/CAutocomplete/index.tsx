import { forwardRef } from "react";

import { Autocomplete, TextField } from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import { ICAutocompleteProps, ICAutocompleteRef } from "./types";

export const CAutocomplete = forwardRef<ICAutocompleteRef, ICAutocompleteProps>(
  (
    { options, error, errorText, placeholder, className, label, ...props },
    ref
  ) => {
    return (
      <CFormControl error={error} errorText={errorText}>
        <Autocomplete
          className={classNames("c-autocomplete", className)}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              // inputRef={inputRef}
              placeholder={placeholder}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                },
              }}
              error={error}
            />
          )}
        />
      </CFormControl>
    );
  }
);
