import { Outlet } from "react-router";

import { Stack } from "@mui/material";

import { CHeader } from "./CHeader";
import { CSidebar } from "./CSidebar";

export const CMainLayout = () => {
  return (
    <Stack direction="row" height="100vh" width="100vw" overflow="hidden">
      <CSidebar />
      <Stack id="layout-container" flex={1} sx={{ overflowY: "auto" }}>
        <CHeader />

        <main>
          <Outlet />
        </main>
      </Stack>
    </Stack>
  );
};
