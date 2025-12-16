import { PropsWithChildren, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/apis/auth.api";
import { CLoading } from "@/components/others";
import { useAuth } from "@/store/auth";

export const CAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { accessToken, isLogined, setAccessToken } = useAuth();

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  const { data, isFetching } = useQuery({
    queryKey: ["profile-data", isLogined, accessToken],
    queryFn: () => authApi.getProfile(),
    enabled: isLogined,
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (data) {
      // setProfile(data);
    }
  }, [data]);

  return isFetching ? <CLoading /> : <>{children}</>;
};
