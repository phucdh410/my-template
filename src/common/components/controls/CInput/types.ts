import { Control, FieldPath, FieldValues } from "react-hook-form";

import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

export interface ICInputRef extends IFormInputComponentRef {}

export interface ICInputProps extends IFormInputComponentProps {
  rows?: number;
  onEnter?: () => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export interface ICFormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  ComponentProps?: ICInputProps;
}
