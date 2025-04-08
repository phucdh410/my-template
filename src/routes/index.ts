import { lazy } from "react";
import { RouteObject } from "react-router";

import { CMainLayout } from "@/components/layouts";
import { CPrivateRoute, CPublicRoute } from "@/components/layouts/CRoutes";

const LoginPage = lazy(() => import("@/modules/auth/pages/Login"));
const TestPage = lazy(() => import("@/modules/test/pages/Test"));
const DevelopmentPage = lazy(() =>
  import("@/components/others/").then(({ CDevelopmentView }) => ({
    default: CDevelopmentView,
  }))
);
const CNotFoundView = lazy(() =>
  import("@/components/others/").then(({ CNotFoundView }) => ({
    default: CNotFoundView,
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
          { path: "/test", Component: TestPage },
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
          {
            path: "/order",
            children: [
              { path: "list", Component: DevelopmentPage },
              { path: "details", Component: DevelopmentPage },
              { path: "create", Component: DevelopmentPage },
              { path: "edit", Component: DevelopmentPage },
            ],
          },
          {
            path: "/blog",
            children: [
              { path: "list", Component: DevelopmentPage },
              { path: "details", Component: DevelopmentPage },
              { path: "create", Component: DevelopmentPage },
              { path: "edit", Component: DevelopmentPage },
            ],
          },
          { path: "/permission", Component: DevelopmentPage },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: CPrivateRoute,
    children: [{ path: "", Component: LoginPage }],
  },
  {
    path: "*",
    Component: CNotFoundView,
  },
] as RouteObject[];
