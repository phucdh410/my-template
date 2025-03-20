import { number, NumberSchema } from "yup";

type Options<T extends boolean> = {
  required?: T;
  requiredMessage?: string;
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
};

export const createNumberSchema = <T extends boolean = true>(
  options?: Options<T>
): T extends true ? NumberSchema<number> : NumberSchema<number | undefined> => {
  const required = (options?.required ?? true) as T;
  const requiredMessage =
    options?.requiredMessage ?? "Thông tin này không được để trống!";
  const min = options?.min;
  const max = options?.max;
  const minMessage = options?.minMessage ?? `Giá trị nhỏ nhất ${min}!`;
  const maxMessage = options?.maxMessage ?? `Giá trị lớn nhất ${max}!`;

  let schema = number();

  if (required) {
    schema = schema.required(requiredMessage) as NumberSchema<number>;
  } else {
    schema = schema.optional() as NumberSchema<number | undefined>;
  }

  if (min) {
    schema = schema.min(min, minMessage);
  }

  if (max) {
    schema = schema.max(max, maxMessage);
  }

  return schema as any;
};
