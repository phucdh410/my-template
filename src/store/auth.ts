import { create } from "zustand";
import { persist } from "zustand/middleware";

type TAuthState = {
  isLogined: boolean;
  accessToken: string;
  refreshToken: string;
};

type TAuthAction = {
  setLogined: (newState: boolean) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
};

export const useAuth = create<TAuthState & TAuthAction>()(
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
