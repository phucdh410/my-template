import { forwardRef, useCallback, useMemo } from "react";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import classNames from "classnames";

import { generateKey } from "@/funcs";

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
      blurOnSelect = true,
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

    const currentValue = useMemo(() => {
      if (optionAll && value === "") return ALL_OPTION;
      const foundValue = options.find((e) => e[get] === value);
      return foundValue ?? null;
    }, [optionAll, options, value]);
    //#endregion

    //#region Event
    const renderInput = useCallback(
      (params: AutocompleteRenderInputParams) => (
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
      ),
      [label, placeholder, error]
    );

    const getOptionKey = useCallback(
      (option: IAutocompleteOption): string | number => {
        return generateKey(option[get]);
      },
      [get]
    );

    const getOptionLabel = useCallback(
      (option: IAutocompleteOption): string => {
        return option[display] ?? "";
      },
      [display]
    );

    const onValueChange = useCallback(
      (
        event: React.SyntheticEvent,
        selectedOption: IAutocompleteOption | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
      ): void => {
        if (selectedOption === null) {
          onChange?.(null, event, selectedOption, reason, details);
        } else {
          onChange?.(
            selectedOption[get],
            event,
            selectedOption,
            reason,
            details
          );
        }
      },
      [get, onChange]
    );
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <Autocomplete
          blurOnSelect={blurOnSelect}
          className={classNames("c-autocomplete", className)}
          disableClearable={disableClearable}
          fullWidth={fullWidth}
          getOptionDisabled={getOptionDisabled}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          loading={loading}
          loadingText={loadingText}
          noOptionsText={noOptionsText}
          onChange={onValueChange}
          options={options}
          renderInput={renderInput}
          value={currentValue}
        />
      </CFormControl>
    );
    //#endregion
  }
);
