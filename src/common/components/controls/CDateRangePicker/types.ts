import { Dayjs } from "dayjs";

import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

export interface ICDateRangePickerRef extends IFormInputComponentRef {}

export interface ICDateRangePickerProps extends IFormInputComponentProps {}

export interface ICPickerModalRef {
  open: () => void;
}

export interface ICPickerModalProps {
  onChange: (values: ICDateRangeValues) => void;
}

export interface ICDateRangeValues {
  from?: null | string | Date | Dayjs;
  to?: null | string | Date | Dayjs;
}
