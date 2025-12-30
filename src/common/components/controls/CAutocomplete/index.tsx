import { forwardRef } from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

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

import {
  IAutocompleteOption,
  ICAutocompleteProps,
  ICAutocompleteRef,
  ICFormAutocompleteProps,
} from "./types";

import { CFormControl } from "../CFormControl";

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
    const options: IAutocompleteOption[] = Array.isArray(_options)
      ? optionAll
        ? [ALL_OPTION, ..._options]
        : _options
      : [];

    const currentValue = multiple
      ? Array.isArray(value)
        ? options.filter((e) => value.includes(e[get]))
        : []
      : optionAll && value === ""
      ? ALL_OPTION
      : options.find((e) => e[get] === value) ?? null;
    //#endregion

    //#region Event
    const renderInput = (params: AutocompleteRenderInputParams) => (
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

    const getOptionKey = (option: IAutocompleteOption): string | number => {
      return generateKey(option[get]);
    };

    const getOptionLabel = (option: IAutocompleteOption): string => {
      return option[display] ?? "";
    };

    const onValueChange = (
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
    };

    const renderValue = (
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
        : null;
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

export const CFormAutocomplete = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ComponentProps,
}: ICFormAutocompleteProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          {...field}
          error={!!error}
          errorText={error?.message}
          {...ComponentProps}
        />
      )}
    />
  );
};
