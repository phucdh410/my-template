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
}
