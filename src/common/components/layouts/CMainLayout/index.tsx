import { useState } from "react";
import { Outlet } from "react-router";

import { Stack, useScrollTrigger } from "@mui/material";

import { CHeader } from "./CHeader";
import { CSidebar } from "./CSidebar";

export const CMainLayout = () => {
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
  const trigger = useScrollTrigger({ target: scrollTarget });
  console.log("🚀 ~ CMainLayout ~ trigger:", trigger);

  return (
    <Stack direction="row" height="100vh" width="100vw" overflow="hidden">
      <CSidebar />
      <Stack
        ref={(node) => {
          if (node) {
            setScrollTarget(node);
          }
        }}
        flex={1}
        sx={{ overflowY: "auto" }}
      >
        <CHeader />

        <Outlet />
      </Stack>
    </Stack>
  );
};
