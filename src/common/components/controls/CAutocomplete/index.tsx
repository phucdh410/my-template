import { forwardRef, useMemo } from "react";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import classNames from "classnames";

import { CFormControl } from "../CFormControl";

import {
  IAutocompleteOption,
  ICAutocompleteProps,
  ICAutocompleteRef,
} from "./types";

const ALL_OPTION = { id: "", label: "Tất cả" };

export const CAutocomplete = forwardRef<ICAutocompleteRef, ICAutocompleteProps>(
  (
    {
      label,
      value,
      onChange,
      className,
      disableClearable = true,
      options: _options = [],
      placeholder,
      fullWidth = true,
      get = "id",
      display = "label",
      error = false,
      errorText = "",
      optionAll = false,
      noOptionsText = "Không có lựa chọn",
      getOptionDisabled,
      loading,
      loadingText,
      virtual,
      ...props
    },
    ref
  ) => {
    //#region Data
    const options = useMemo<IAutocompleteOption[]>(() => {
      //note: Tránh crash nếu options được truyền vào...
      //note: ...có lỗi phát sinh không phải là 1 mảng
      if (!Array.isArray(_options)) return [];

      if (optionAll) {
        return [ALL_OPTION, ..._options];
      } else return _options;
    }, [_options, optionAll]);
    //#endregion

    //#region Event
    const renderInput = (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label}
        placeholder={placeholder}
        slotProps={{
          input: {
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>,
          },
        }}
        error={error}
      />
    );
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <Autocomplete
          className={classNames("c-autocomplete", className)}
          options={options}
          renderInput={renderInput}
        />
      </CFormControl>
    );
    //#endregion
  }
);
