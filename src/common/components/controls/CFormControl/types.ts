import { ReactNode } from "react";

import { IFormInputComponentProps } from "../../../../types/form";

export interface ICFormControlProps
  extends Pick<IFormInputComponentProps, "error" | "errorText"> {
  children?: ReactNode;
}
