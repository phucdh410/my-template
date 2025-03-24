import { Controller, useForm } from "react-hook-form";

import { authApi } from "@/apis/auth.api";
import { CButton, CInput } from "@/components/controls";
import { useAuth } from "@/store/auth";
import { ILoginPayload } from "@/types/auth";

import { loginDefaultValues, loginResolver } from "../../forms";

export const MLoginForm = () => {
  //#region Data
  const { control, handleSubmit } = useForm<ILoginPayload>({
    mode: "all",
    defaultValues: loginDefaultValues,
    resolver: loginResolver,
  });

  const { setAccessToken, setRefreshToken } = useAuth();
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const res = await authApi.login(values);
        const { access_token, refresh_token } = res.data.data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
      } catch (error: any) {
        console.error(error);
      }
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
