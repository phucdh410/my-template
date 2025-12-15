import { create } from "zustand";
import { persist } from "zustand/middleware";

import { setAuthToken } from "@/axios";

type TAuthState = {
  isLogined: boolean;
  accessToken: string;
  refreshToken: string;
};

type TAuthAction = {
  setAccessToken: (token?: string) => void;
  setRefreshToken: (token?: string) => void;
};

export const useAuth = create<TAuthState & TAuthAction>()(
  persist(
    (set) => ({
      isLogined: false,
      accessToken: "",
      refreshToken: "",

      setAccessToken: (token) =>
        set(() => {
          setAuthToken(token);
          return { accessToken: token, isLogined: Boolean(token) };
        }),
      setRefreshToken: (token) => set(() => ({ refreshToken: token })),
    }),
    { name: "auth" }
  )
);
