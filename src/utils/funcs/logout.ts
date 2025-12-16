import { toast } from "sonner";

import { authApi } from "@/apis/auth.api";
import { useAuth } from "@/store/auth";

export const logoutUser = async () => {
  try {
    const { accessToken, setAccessToken, setRefreshToken } = useAuth.getState();
    if (accessToken) authApi.logout();
    setAccessToken();
    setRefreshToken("");
  } catch (error: any) {
    toast.error(error?.message ?? "Logout không thành công!");
  }
};
