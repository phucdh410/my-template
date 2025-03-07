import { ReactElement } from "react";

import { ICFiltersTable } from "./CFiltersTable/types";
import { ICPaginationTableProps } from "./CPaginationTable/types";

export type TColumnTypes = "number" | "date" | "datetime";

export interface ICTableHeaderBase<T> {
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

export type ICTableHeaderProps<T> =
  | ({
      /**
       * Determines whether this column should be pinned to the left or right.
       * - `"left"`: Pins this column to the left.
       * - `"right"`: Pins this column to the right.
       * - `undefined`: This column is not pinned.
       */
      pin: "left" | "right";

      /**
       * Defines the width of the column.
       * For pinned columns, a specific width is optimized for better UI consistency.
       */
      width: number;
    } & ICTableHeaderBase<T>)
  | ({ pin?: undefined; width?: number | string } & ICTableHeaderBase<T>);

export type TCHeadersTable<T> = ICTableHeaderProps<T>[];

export interface ICTableProps<T, F> {
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

  filters?: ICFiltersTable<F>;

  pagination?: ICPaginationTableProps;
}
