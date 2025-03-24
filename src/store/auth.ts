import { create } from "zustand";
import { persist } from "zustand/middleware";

type IAuthState = {
  isLogined: boolean;
  accessToken: string;
  refreshToken: string;
};

type IAuthAction = {
  setLogined: (newState: boolean) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
};

export const useAuth = create<IAuthState & IAuthAction>()(
  persist(
    (set) => ({
      isLogined: false,
      accessToken: "",
      refreshToken: "",
      setLogined: (newLoginState) => set(() => ({ isLogined: newLoginState })),
      setAccessToken: (token) => set(() => ({ accessToken: token })),
      setRefreshToken: (token) => set(() => ({ refreshToken: token })),
    }),
    { name: "authentication" }
  )
);
