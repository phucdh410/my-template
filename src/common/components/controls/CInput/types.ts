import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

export interface ICInputRef extends IFormInputComponentRef {}

export interface ICInputProps extends IFormInputComponentProps {
  rows?: number;
  onEnter?: () => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
