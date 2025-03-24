import { PropsWithChildren, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/apis/auth.api";
import { setAuthToken } from "@/axios";
import { useAuth } from "@/store/auth";

export const CAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { accessToken, setLogined } = useAuth();

  useEffect(() => {
    setAuthToken(accessToken);
  }, [accessToken]);

  const { isFetching, isSuccess } = useQuery({
    queryKey: ["profile-data", accessToken],
    queryFn: () => authApi.getProfile(),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (isSuccess) setLogined(true);
  }, [isSuccess]);

  return isFetching ? <div>Loading UI</div> : <>{children}</>;
};
