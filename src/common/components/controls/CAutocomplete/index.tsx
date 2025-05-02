import { forwardRef, useCallback, useMemo } from "react";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  Chip,
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
      multiple = false,
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
      if (multiple) {
        if (!value || !Array.isArray(value)) return [];
        return options.filter((e) => value.includes(e[get]));
      } else {
        if (optionAll && value === "") return ALL_OPTION;
        const foundValue = options.find((e) => e[get] === value);
        return foundValue ?? null;
      }
    }, [optionAll, options, value, get, multiple]);
    //#endregion

    //#region Event
    const renderInput = useCallback(
      (params: AutocompleteRenderInputParams) => {
        console.log(params);
        return (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            slotProps={{
              inputLabel: {
                ...params.InputLabelProps,
                className: classNames(
                  "c-form-label",
                  params.InputLabelProps.className
                ),
              },
              input: {
                ...params.InputProps,
                className: classNames(
                  "c-outlined-input-root",
                  params.InputProps.className
                ),
                endAdornment: <>{params.InputProps.endAdornment}</>,
              },
              htmlInput: {
                ...params.inputProps,
                className: classNames(
                  "c-outlined-input-input",
                  params.inputProps.className
                ),
              },
            }}
            error={error}
          />
        );
      },
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
        selectedOption: IAutocompleteOption[] | IAutocompleteOption | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
      ): void => {
        if (multiple) {
          onChange?.(
            [...(selectedOption as IAutocompleteOption[]).map((e) => e[get])],
            event,
            selectedOption,
            reason,
            details
          );
        } else {
          if (selectedOption === null) {
            onChange?.(null, event, selectedOption, reason, details);
          } else {
            onChange?.(
              (selectedOption as IAutocompleteOption)[get],
              event,
              selectedOption,
              reason,
              details
            );
          }
        }
      },
      [get, onChange]
    );

    const renderValue = useCallback(
      (
        values: IAutocompleteOption[] | IAutocompleteOption,
        getItemProps: (arg: { index: number }) => Record<string, any>
      ) =>
        values?.length > 0
          ? (values as IAutocompleteOption[]).map((valueItem, index) => {
              const {
                key,
                className: itemClassname,
                ...itemProps
              } = getItemProps({ index });
              return (
                <Chip
                  key={key}
                  size="small"
                  label={valueItem.label}
                  className={classNames("c-autocomplete-tag", itemClassname)}
                  {...itemProps}
                />
              );
            })
          : null,
      []
    );
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText}>
        <Autocomplete
          multiple={multiple}
          blurOnSelect={multiple ? false : blurOnSelect}
          disableCloseOnSelect={multiple}
          className={classNames(
            "c-autocomplete",
            multiple && "c-autocomplete-multiple",
            className
          )}
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
          renderValue={multiple ? renderValue : undefined}
          value={currentValue}
        />
      </CFormControl>
    );
    //#endregion
  }
);
