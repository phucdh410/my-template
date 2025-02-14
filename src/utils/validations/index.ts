import { isDayjs } from "dayjs";
import { mixed } from "yup";

export const dateSchema = mixed<Date | string>()
  .required("Vui lòng chọn ngày!")
  .test("date-valid", "Ngày không hợp lệ!", (value) => {
    return typeof value === "string" || value instanceof Date || isDayjs(value);
  });
