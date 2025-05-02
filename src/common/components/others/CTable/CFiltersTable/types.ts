import { IAutocompleteOption } from "@/components/controls/CAutocomplete/types";
import { ICDatePickerProps } from "@/components/controls/CDatePicker/types";

type BaseFilter<T> = {
  /**
   * The label to display for the filter.
   * Example: "Select a category".
   */
  label: string;

  /**
   * A unique key to identify the filter.
   * This must be a key of the provided type T.
   */
  key: keyof T;

  /**
   * The type of filter, determining its behavior and UI component.
   * - "input": A text input field.
   * - "selection": A dropdown or similar selection field.
   * - "datepicker": A date selection field.
   */
  type: "input" | "selection" | "datepicker";

  /**
   * A callback function triggered when the filter value changes.
   * @param key - The unique key of the filter.
   * @param newFilterValue - The new value of the filter.
   */
  onFilter?: (key: keyof T, newFilterValue: any) => void;
};

type InputFilter<T> = BaseFilter<T> & {
  type: "input";
};

export type DatepickerFilter<T> = BaseFilter<T> &
  Pick<ICDatePickerProps, "views" | "format"> & {
    type: "datepicker";
  };

export type SelectionFilter<T> = BaseFilter<T> & {
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
export type TFilterProps<T> =
  | InputFilter<T>
  | DatepickerFilter<T>
  | SelectionFilter<T>;

export type TFiltersTable<T> = TFilterProps<T>[];

export interface ICFiltersTable<T> {
  /**
   * The current values of all filter fields.
   * Each key represents a filter name, and the value is the selected filter option.
   */
  values: T;

  /**
   * Function to update new filters values when the user makes a change.
   */
  onFiltersChange: (newFilters: T) => void;

  /**
   * The default values for all filters, used when resetting filters to their initial state.
   */
  initialValues: T;

  /**
   * The configuration structure for all available filters.
   * This defines the filter types and their settings.
   */
  templates: TFiltersTable<T>;
}

export interface ICFiltersTableProps<T> {
  filters: ICFiltersTable<T>;
}
