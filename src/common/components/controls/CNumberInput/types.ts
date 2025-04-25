import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

import { ICInputProps } from "../CInput/types";

export interface ICNumberInputRef extends IFormInputComponentRef {}

export interface ICNumberInputProps
  extends IFormInputComponentProps,
    Pick<ICInputProps, "onEnter" | "prefix" | "suffix"> {
  isFloat?: boolean;
  min?: number;
  max?: number;
}
