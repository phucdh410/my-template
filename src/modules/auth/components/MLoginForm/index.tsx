import { Controller, useForm } from "react-hook-form";

import { CButton, CInput } from "@/components/controls";
import { ILoginPayload } from "@/types/login";

import { loginDefaultValues, loginResolver } from "../../forms";

export const MLoginForm = () => {
  //#region Data
  const { control, handleSubmit } = useForm<ILoginPayload>({
    mode: "all",
    defaultValues: loginDefaultValues,
    resolver: loginResolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      console.log(values);
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState: { error } }) => (
          <CInput {...field} error={!!error} errorText={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <CInput {...field} error={!!error} errorText={error?.message} />
        )}
      />
      <CButton onClick={onSubmit} sx={{ mt: 2 }}>
        Đăng nhập
      </CButton>
    </>
  );
  //#endregion
};
