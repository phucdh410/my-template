import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

export interface ICCheckboxRef extends IFormInputComponentRef {}

export interface ICCheckboxProps
  extends Omit<IFormInputComponentProps, "onChange"> {
  isIndeterminate?: boolean;
  onChange?: (
    checked: boolean,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.SyntheticEvent<Element, Event>
  ) => void;
}
