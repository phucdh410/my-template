import { HTMLInputTypeAttribute } from "react";

import { InputProps } from "@mui/material";

//note: FORM & INPUT INTERFACES
export interface IFormInputComponentRef {
  blur: () => void;
  focus: () => void;
}

export interface IFormInputComponentProps<T = any> {
  id?: string;
  name?: string;
  className?: string;
  value?: T | null;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  onKeyDown?: (
    event: React.KeyboardEvent<
      HTMLDivElement | HTMLLabelElement | HTMLTextAreaElement
    >
  ) => void;
}

export interface ICommonCInputProps extends IFormInputComponentProps {
  placeholder?: string;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  InputProps?: InputProps;
}
