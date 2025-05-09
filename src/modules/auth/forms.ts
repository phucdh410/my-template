import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";

import { ILoginPayload } from "@/types/auth";

export const loginDefaultValues: ILoginPayload = {
  username: "",
  password: "",
};

const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export const loginResolver = yupResolver(loginSchema);

export type TLoginRequestSchema = InferType<typeof loginSchema>;
