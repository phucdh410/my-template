import { Controller, useForm } from "react-hook-form";

import { AccountCircle, Lock } from "@mui/icons-material";
import { toast } from "sonner";

import { authApi } from "@/apis/auth.api";
import { CButton, CInput } from "@/components/controls";
import { useAuth } from "@/store/auth";

import {
  loginDefaultValues,
  loginResolver,
  TLoginRequestSchema,
} from "../../forms";

export const MLoginForm = () => {
  //#region Data
  const { control, handleSubmit } = useForm<TLoginRequestSchema>({
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
        toast.error(error?.message ?? "Login không thành công!");
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
          <CInput
            {...field}
            label="Username"
            placeholder="Nhập tên đăng nhập"
            error={!!error}
            errorText={error?.message}
            prefix={<AccountCircle />}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <CInput
            {...field}
            label="Password"
            placeholder="Nhập tên mật khẩu"
            error={!!error}
            errorText={error?.message}
            prefix={<Lock />}
          />
        )}
      />
      <CButton onClick={onSubmit} sx={{ mt: 2 }}>
        Đăng nhập
      </CButton>
    </>
  );
  //#endregion
};
