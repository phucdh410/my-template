import { forwardRef, useCallback } from "react";

import { Checkbox, FormControlLabel } from "@mui/material";
import classNames from "classnames";

import { ICCheckboxProps, ICCheckboxRef } from "./types";

export const CCheckbox = forwardRef<ICCheckboxRef, ICCheckboxProps>(
  ({ label, value, onChange, className, isIndeterminate }, ref) => {
    //#region Event
    const onInputChange = useCallback(
      (
        event:
          | React.ChangeEvent<HTMLInputElement>
          | React.SyntheticEvent<Element, Event>,
        checked: boolean
      ) => {
        onChange?.(checked, event);
      },
      [onChange]
    );
    //#endregion

    //#region Render
    return label ? (
      <FormControlLabel
        label={label}
        value={!!value}
        onChange={onInputChange}
        sx={{ m: 0, width: "fit-content" }}
        control={
          <Checkbox
            className={classNames("c-checkbox", className)}
            icon={<UncheckIcon />}
            checkedIcon={<CheckedIcon />}
            indeterminateIcon={<IndeterminateIcon />}
            indeterminate={isIndeterminate}
            sx={{ mr: 0.5 }}
          />
        }
      />
    ) : (
      <Checkbox
        checked={!!value}
        value={!!value}
        onChange={onInputChange}
        className={classNames("c-checkbox", className)}
        icon={<UncheckIcon />}
        checkedIcon={<CheckedIcon />}
        indeterminateIcon={<IndeterminateIcon />}
        indeterminate={isIndeterminate}
      />
    );
    //#endregion
  }
);

//#region Uncheck Icon
export const UncheckIcon = () => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M8 2C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2H8ZM8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8Z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};
//#endregion

//#region Checked Icon
export const CheckedIcon = () => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="currentColor"
        height="20"
        rx="6"
        width="20"
        x="2"
        y="2"
      ></rect>
      <path
        d="M7.55566 11.7222L10.5186 14.7778L16.4446 8.66669"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};
//#endregion

//#region Indeterminate Icon
export const IndeterminateIcon = () => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M8 2C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2H8ZM8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8Z"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
      <path
        d="M8 12H16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};
//#endregion
