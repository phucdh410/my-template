import { ReactElement } from "react";

export type TColumnTypes = "number" | "date" | "datetime";

export interface ICTableHeaderProps {
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
  valueFormatter?: (value: any, row: any, index: number) => any;

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
  renderCell?: (value: any, row: any, index: number) => ReactElement;
}

export type TCHeadersTable = ICTableHeaderProps[];

export interface ICTableProps {
  /**
   * List of column headers, defining how each column should be rendered.
   */
  headers: ICTableHeaderProps[];

  /**
   * Data source for the table, each item represents a row.
   */
  data: any[];

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
}
