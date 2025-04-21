import dayjs from "dayjs";

import { ICDateRangeValues } from "./types";

export const dateRangeValueFormatter = (value?: ICDateRangeValues): string => {
  if (!value) return "";

  const { from, to } = value;

  if (!from || !to) return from || to ? "Invalid date range" : "";

  const fromDate = dayjs(from).locale("en");
  const toDate = dayjs(to).locale("en");

  if (fromDate.isSame(toDate, "year")) {
    if (fromDate.isSame(toDate, "month")) {
      if (fromDate.isSame(toDate, "date")) {
        return fromDate.format("D MMM YYYY");
      }
      return `${fromDate.format("D")} - ${toDate.format("D MMM YYYY")}`;
    }
    return `${fromDate.format("D MMM")} - ${toDate.format("D MMM YYYY")}`;
  }

  return `${fromDate.format("D MMM YYYY")} - ${toDate.format("D MMM YYYY")}`;
};
