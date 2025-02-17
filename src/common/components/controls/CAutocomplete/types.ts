import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";

import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "../../../../types/form";

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
  virtual?: boolean;
}
