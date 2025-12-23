import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";

import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

export interface ICAutocompleteRef extends IFormInputComponentRef {}

export interface IAutocompleteOption {
  id: string | number | boolean;
  label: string;
  [key: string]: any;
}

export interface ICAutocompleteProps extends IFormInputComponentProps {
  options: IAutocompleteOption[];
  disableClearable?: boolean;
  get?: string;
  display?: string;
  onChange?: (
    value: any,
    event?: React.SyntheticEvent,
    selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null,
    reason?: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
  ) => void;
  optionAll?: boolean;
  noOptionsText?: React.ReactNode;
  getOptionDisabled?: (option: IAutocompleteOption) => boolean;
  loading?: boolean;
  loadingText?: string;
  blurOnSelect?: "touch" | "mouse" | true | false;
  multiple?: boolean;
}

export interface ICFormAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  ComponentProps: ICAutocompleteProps;
}
