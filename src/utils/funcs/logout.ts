import { authApi } from "@/apis/auth.api";
import { setAuthToken } from "@/axios";
import { useAuth } from "@/store/auth";

export const logoutUser = async () => {
  try {
    const { accessToken, setLogined, setAccessToken, setRefreshToken } =
      useAuth.getState();
    if (accessToken) authApi.logout();
    setLogined(false);
    setAccessToken("");
    setRefreshToken("");
    setAuthToken();
  } catch (error: any) {
    console.error(error?.message);
  }
};
