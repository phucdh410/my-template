import { useLocation } from "react-router";

export const useRouteActive = (routePath: string) => {
  const { pathname } = useLocation();
  return pathname.slice(1).startsWith(routePath);
};
