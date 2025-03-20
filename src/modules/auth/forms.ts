import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

import { ILoginPayload } from "@/types/login";
import { createStringSchema } from "@/validations";

export const loginDefaultValues: ILoginPayload = {
  username: "",
  password: "",
};

export const loginResolver: Resolver<ILoginPayload> = yupResolver(
  object({
    username: createStringSchema(),
    password: createStringSchema(),
  })
);
