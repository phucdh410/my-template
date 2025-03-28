import { lazy } from "react";
import { RouteObject } from "react-router";

import { CMainLayout } from "@/components/layouts";
import { CPrivateRoute, CPublicRoute } from "@/components/layouts/CRoutes";

const LoginPage = lazy(() => import("@/modules/auth/pages/Login"));
const DevelopmentPage = lazy(() =>
  import("@/components/others/").then(({ CDevelopmentView }) => ({
    default: CDevelopmentView,
  }))
);

export default [
  {
    path: "/",
    Component: CPublicRoute,
    children: [
      {
        path: "",
        Component: CMainLayout,
        children: [
          { path: "/app", Component: DevelopmentPage },
          { path: "/ecommerce", Component: DevelopmentPage },
          { path: "/analytics", Component: DevelopmentPage },
          { path: "/banking", Component: DevelopmentPage },
          { path: "/booking", Component: DevelopmentPage },
          { path: "/file", Component: DevelopmentPage },
          {
            path: "/user",
            children: [
              { path: "profile", Component: DevelopmentPage },
              { path: "cards", Component: DevelopmentPage },
              { path: "list", Component: DevelopmentPage },
              { path: "create", Component: DevelopmentPage },
              { path: "edit", Component: DevelopmentPage },
            ],
          },
          {
            path: "/product",
            children: [
              { path: "list", Component: DevelopmentPage },
              { path: "details", Component: DevelopmentPage },
              { path: "create", Component: DevelopmentPage },
              { path: "edit", Component: DevelopmentPage },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: CPrivateRoute,
    children: [{ path: "", Component: LoginPage }],
  },
] as RouteObject[];
