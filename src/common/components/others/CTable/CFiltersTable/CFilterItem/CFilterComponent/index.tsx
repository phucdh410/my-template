import { forwardRef, useImperativeHandle, useState } from "react";

import { DateView as DatePickerViews } from "@mui/x-date-pickers";

import { CAutocomplete, CDatePicker, CInput } from "@/components/controls";
import { IAutocompleteOption } from "@/components/controls/CAutocomplete/types";

export interface ICFilterComponentRef {
  takeValue: () => any; //note: return changed value
}

interface ICFilterComponentProps {
  type: "input" | "selection" | "datepicker";
  label: string;
  options?: IAutocompleteOption[];
  views?: DatePickerViews[];
  format?: string;
  onSubmit?: () => void;
  initialValue: any;
}

export const CFilterComponent = forwardRef<
  ICFilterComponentRef,
  ICFilterComponentProps
>(
  (
    { type, label, options = [], views, format, onSubmit, initialValue },
    ref
  ) => {
    //#region Data
    const [value, setValue] = useState(initialValue ?? "");
    //#endregion

    //#region Event
    const onChange = (value: any | React.ChangeEvent<HTMLInputElement>) => {
      if (
        typeof value === "object" &&
        "target" in value &&
        value.target instanceof HTMLInputElement
      ) {
        //note: first value at here IStore React ChangeEvent<HTMLInputElement>
        setValue(value.target.value);
      } else {
        setValue(value);
      }
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      takeValue: () => value,
    }));

    //#region Render
    switch (type) {
      case "input":
        return (
          <CInput
            value={value}
            onChange={onChange}
            placeholder={`Nhập ${label}`}
            onEnter={onSubmit}
          />
        );
      case "selection":
        return (
          <CAutocomplete
            value={value}
            onChange={onChange}
            placeholder={`Chọn ${label}`}
            options={options || []}
          />
        );
      case "datepicker":
        return (
          <CDatePicker
            value={(value as unknown as Date) || null}
            onChange={onChange}
            views={views}
            format={format}
          />
        );
      default:
        return null;
    }
    //#endregion
  }
);
