import { Dayjs } from "dayjs";
import { mixed, MixedSchema } from "yup";

type Options<T extends boolean> = {
  required?: T;
  requiredMessage?: string;
};

export const createDateSchema = <T extends boolean = true>(
  options?: Options<T>
): T extends true
  ? MixedSchema<Date | Dayjs | string>
  : MixedSchema<Date | Dayjs | string | undefined> => {
  const required = (options?.required ?? true) as T;
  const requiredMessage =
    options?.requiredMessage ?? "Thông tin này không được để trống!";

  let schema = mixed();

  if (required) {
    schema = schema.required(requiredMessage) as MixedSchema<
      Date | Dayjs | string
    >;
  } else {
    schema = schema.optional() as MixedSchema<
      Date | Dayjs | string | undefined
    >;
  }

  return schema as any;
};
