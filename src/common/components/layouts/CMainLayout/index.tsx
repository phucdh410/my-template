import { Outlet } from "react-router";

import { Box, Stack } from "@mui/material";

import { CONTAINER_PADDING_X } from "@/constants/variables";

import { CHeader } from "./CHeader";
import { CSidebar } from "./CSidebar";

export const CMainLayout = () => {
  return (
    <Stack direction="row" height="100vh" width="100vw" overflow="hidden">
      <CSidebar />
      <Stack id="layout-container" flex={1} sx={{ overflowY: "auto" }}>
        <CHeader />

        <main style={{ flex: 1 }}>
          <Box height="100%" px={CONTAINER_PADDING_X}>
            <Outlet />
          </Box>
        </main>
      </Stack>
    </Stack>
  );
};
