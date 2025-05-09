import { AxiosRequestConfig } from "axios";
import dayjs, { isDayjs } from "dayjs";

export const cleanRequestParams = (params: AxiosRequestConfig["params"]) => {
  for (let [key, value] of Object.entries(params)) {
    if (!value && value !== 0) params[key] = null;
    if (
      (isDayjs(value) || dayjs(value as any).isValid()) &&
      typeof value !== "number" &&
      typeof value !== "undefined"
    )
      params[key] = dayjs(value as Date).format("YYYY-MM-DD HH:mm:ss");
  }
};
