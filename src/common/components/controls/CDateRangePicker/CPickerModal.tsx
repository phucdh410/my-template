import { forwardRef, useImperativeHandle, useState } from "react";

import { Dialog, Stack, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs, { Dayjs } from "dayjs";

import {
  ICDateRangeValues,
  ICPickerModalProps,
  ICPickerModalRef,
} from "./types";

import { CButton } from "../CButton";

const DEFAULT_LIMIT_RANGES = {
  min: dayjs().startOf("year").subtract(10, "year"),
  max: dayjs().endOf("year").add(10, "year"),
};
//note: Giới hạn khoảng thời gian cho phép chọn, có thể bỏ nếu không cần rào 2 đầu

export const CPickerModal = forwardRef<ICPickerModalRef, ICPickerModalProps>(
  ({ onChange }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<ICDateRangeValues>({
      from: null,
      to: null,
    });
    const [min, setMin] = useState<Dayjs | undefined>(
      values.from ? dayjs(values.from) : DEFAULT_LIMIT_RANGES.min
    );
    const [max, setMax] = useState<Dayjs | undefined>(
      values.to ? dayjs(values.to) : DEFAULT_LIMIT_RANGES.max
    );

    const errorText =
      !values.from && values.to
        ? "Chưa chọn ngày bắt đầu!"
        : values.from && !values.to
        ? "Chưa chọn ngày kết thúc!"
        : "";
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setValues({ from: null, to: null });
      setMin(DEFAULT_LIMIT_RANGES.min);
      setMax(DEFAULT_LIMIT_RANGES.max);
    };

    const onDateChange = (key: "from" | "to") => (value: PickerValue) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      key === "from" ? setMin(dayjs(value)) : setMax(dayjs(value));
    };

    const onApply = () => {
      onChange(values);
      onClose();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (initValues) => {
        if (initValues) setValues(initValues);
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        className="c-date-range-picker--dialog"
      >
        <Stack p={3} gap={3}>
          <Typography fontWeight={600} fontSize="1.125rem" color="#1C252E">
            Chọn khoảng thời gian
          </Typography>

          <Stack direction="row" gap={3}>
            <div className="c-date-range-picker--calendar-wrapper">
              <DateCalendar
                value={values.from ? dayjs(values.from) : null}
                onChange={onDateChange("from")}
                minDate={DEFAULT_LIMIT_RANGES.min}
                maxDate={max}
                reduceAnimations
                dayOfWeekFormatter={(date) => date.format("dd")}
              />
            </div>
            <div className="c-date-range-picker--calendar-wrapper">
              <DateCalendar
                value={values.to ? dayjs(values.to) : null}
                onChange={onDateChange("to")}
                minDate={min}
                maxDate={DEFAULT_LIMIT_RANGES.max}
                reduceAnimations
                dayOfWeekFormatter={(date) => date.format("dd")}
              />
            </div>
          </Stack>

          {errorText && (
            <span className="c-date-range-picker--error">{errorText}</span>
          )}

          <Stack direction="row" gap={1.5} justifyContent="end">
            <CButton
              className="c-date-range-picker--modal-button cancel-button"
              onClick={onClose}
            >
              Cancel
            </CButton>
            <CButton
              className="c-date-range-picker--modal-button apply-button"
              onClick={onApply}
              disabled={!!errorText}
            >
              Apply
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
