import { RouteObject } from "react-router";

import { CMainLayout } from "@/components/layouts";
import LoginPage from "@/modules/auth/pages/Login";

export default [
  { path: "/", Component: CMainLayout },
  {
    path: "/login",
    Component: LoginPage,
  },
] as RouteObject[];
