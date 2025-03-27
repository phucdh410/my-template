import { lazy } from "react";
import { RouteObject } from "react-router";

import { CMainLayout } from "@/components/layouts";
import { CPrivateRoute, CPublicRoute } from "@/components/layouts/CRoutes";

const LoginPage = lazy(() => import("@/modules/auth/pages/Login"));

export default [
  {
    path: "/",
    Component: CPublicRoute,
    children: [{ path: "", Component: CMainLayout }],
  },
  {
    path: "/login",
    Component: CPrivateRoute,
    children: [{ path: "", Component: LoginPage }],
  },
] as RouteObject[];
