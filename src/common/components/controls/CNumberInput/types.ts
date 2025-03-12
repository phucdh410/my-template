import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

import { ICInputProps } from "../CInput/types";

export interface ICNumberInputRef extends IFormInputComponentRef {}

export interface ICNumberInputProps
  extends IFormInputComponentProps,
    Pick<ICInputProps, "onEnter"> {
  suffix?: string;
  isFloat?: boolean;
  min?: number;
  max?: number;
}
