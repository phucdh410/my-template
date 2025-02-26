import { ReactElement } from "react";

import { IAutocompleteOption } from "@/components/controls/CAutocomplete/types";
import { ICDatePickerProps } from "@/components/controls/CDatePicker/types";

export type TColumnTypes = "number" | "date" | "datetime";

export interface ICTableHeaderProps<T> {
  /**
   * Unique key to identify the column.
   */
  key: string;

  /**
   * Display label for the column header.
   */
  label: string;

  /**
   * Optional flag to set the alignment.
   * @default `center`
   */
  align?: "left" | "center" | "right";

  /**
   * Specifies the type of data in the column.
   *
   * Example:
   * - `"number"` for numerical values
   * - `"date"` for dates
   * - `"datetime"` for date-time values
   */
  columnType?: TColumnTypes;

  /**
   * Additional CSS classes to style the column header.
   * This allows for custom styling such as adjusting width, text color, etc.
   *
   * Example:
   * ```tsx
   * className: "w-32 text-gray-500"
   * ```
   */
  className?: string;

  width?: number | string;

  /**
   * Function to format the displayed value in the cell.
   * Use this when you only need to transform the displayed value
   * without changing the cell's structure.
   *
   * Example: Formatting a number as currency
   * ```tsx
   * valueFormatter: (value) => `$${value.toFixed(2)}`
   * ```
   */
  valueFormatter?: (value: any, row: T, index: number) => any;

  /**
   * Function to render a custom cell component.
   * Use this when you need to render complex content in the cell
   * (e.g., buttons, icons, tooltips, etc.).
   *
   * Example: Rendering a status badge
   * ```tsx
   * renderCell: (value, row) => <StatusBadge status={value} />
   * ```
   */
  renderCell?: (value: any, row: T, index: number) => ReactElement;
}

export type TCHeadersTable<T> = ICTableHeaderProps<T>[];

type BaseFilter = {
  /**
   * The label to display for the filter.
   * Example: "Select a category".
   */
  label: string;

  /**
   * A unique key to identify the filter.
   * This is used as an identifier for logic and callbacks.
   */
  key: string;

  /**
   * The type of filter, determining its behavior and UI component.
   * - "input": A text input field.
   * - "selection": A dropdown or similar selection field.
   * - "datepicker": A date selection field.
   */
  type: "input" | "selection" | "datepicker";

  /**
   * The current value of the filter.
   * Should match the type of data expected for the filter.
   */
  value?: any;

  /**
   * A callback function triggered when the filter value changes.
   * @param key - The unique key of the filter.
   * @param newFilterValue - The new value of the filter.
   */
  onFilter?: (key: string, newFilterValue: any) => void;
};

type InputFilter = BaseFilter & {
  type: "input";
};

type DatepickerFilter = BaseFilter &
  Pick<ICDatePickerProps, "views" | "format"> & {
    type: "datepicker";
  };

type SelectionFilter = BaseFilter & {
  type: "selection";
  /**
   * A list of selectable options for the filter.
   * This field is required when `type` is "selection".
   */
  options: IAutocompleteOption[];
};

/**
 * A union type representing a filter that can be of various types:
 * - "input": A text input filter.
 * - "selection": A dropdown filter, requires `options`.
 * - "datepicker": A date selection filter.
 */
export type TFilterProps = InputFilter | DatepickerFilter | SelectionFilter;

export type TCFiltersTable = TFilterProps[];

export interface ICTableProps<T> {
  /**
   * List of column headers, defining how each column should be rendered.
   */
  headers: ICTableHeaderProps<T>[];

  /**
   * Data source for the table, each item represents a row.
   */
  data: T[];

  /**
   * Optional flag to show a loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Unique key for each row record.
   * This should be a **unique identifier** within the dataset (e.g., `id`, `uuid`).
   *
   * Example:
   * ```tsx
   * rowKey: "id" // If each row has a unique "id" field
   * ```
   *
   * If not provided, the index in the array may be used as a fallback,
   * but this is **not recommended** for dynamic lists.
   */
  rowKey?: string;

  /**
   * Controls the text transformation for the column header.
   * This can be used to enforce consistent text styling across headers.
   * @default `none`
   */
  headerTransform?: "uppercase" | "lowercase" | "capitalize";

  /**
   * Set the header sticky.
   * @default true
   */
  stickyHeader?: boolean;

  /**
   * Defines the height of the table.
   * Accepts a number (interpreted as pixels) or a string (e.g., "100px", "50%", "auto").
   * If not provided, the table height will be determined by its content.
   */
  height?: number | string;

  /**
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hover?: boolean;

  filters?: TFilterProps[];
}
