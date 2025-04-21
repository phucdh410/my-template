import { Dayjs } from "dayjs";

import { IFormInputComponentProps, IFormInputComponentRef } from "@/types/form";

export interface ICDateRangePickerRef extends IFormInputComponentRef {}

export interface ICDateRangePickerProps extends IFormInputComponentProps {
  value?: ICDateRangeValues;
  onChange?: (values: ICDateRangeValues) => void;
}

export interface ICPickerModalRef {
  open: (initValues?: ICDateRangeValues) => void;
}

export interface ICPickerModalProps {
  onChange: (values: ICDateRangeValues) => void;
}

export interface ICDateRangeValues {
  from?: null | string | Date | Dayjs;
  to?: null | string | Date | Dayjs;
}
