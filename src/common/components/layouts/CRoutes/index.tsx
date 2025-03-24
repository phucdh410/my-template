import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/store/auth";

export const CPublicRoute = () => {
  const { isLogined } = useAuth();
  return isLogined ? <Outlet /> : <Navigate to="/login" replace />;
};

export const CPrivateRoute = () => {
  const { isLogined } = useAuth();
  return isLogined ? <Navigate to="/" replace /> : <Outlet />;
};
