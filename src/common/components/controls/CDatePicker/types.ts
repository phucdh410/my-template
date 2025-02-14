import { DateView } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "../../../../types/form";

export interface ICDatePickerRef extends IFormInputComponentRef {}

export interface ICDatePickerProps extends IFormInputComponentProps {
  value?: string | Date | Dayjs | null;
  views?: DateView[];
  format?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  placeholder?: string;
  reduceAnimations?: boolean;
  hidePickerIcon?: boolean;
  showDaysOutsideCurrentMonth?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}
