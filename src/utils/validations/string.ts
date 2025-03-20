import { string, StringSchema } from "yup";

type Options<T extends boolean> = {
  required?: T;
  requiredMessage?: string;
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
};

export const createStringSchema = <T extends boolean = true>(
  options?: Options<T>
): T extends true ? StringSchema<string> : StringSchema<string | undefined> => {
  const required = (options?.required ?? true) as T;
  const requiredMessage =
    options?.requiredMessage ?? "Thông tin này không được để trống!";
  const min = options?.min;
  const max = options?.max;
  const minMessage = options?.minMessage ?? `Tối thiểu ${min} kí tự!`;
  const maxMessage = options?.maxMessage ?? `Tối đa ${max} kí tự!`;

  let schema = string().trim();

  if (required) {
    schema = schema.required(requiredMessage) as StringSchema<string>;
  } else {
    schema = schema.optional() as StringSchema<string | undefined>;
  }

  if (min) {
    schema = schema.min(min, minMessage);
  }

  if (max) {
    schema = schema.max(max, maxMessage);
  }

  return schema as any;
};
