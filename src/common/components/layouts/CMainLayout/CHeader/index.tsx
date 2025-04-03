import { AppBar, Stack } from "@mui/material";

import "./styles.scss";

export const CHeader = () => {
  return (
    <AppBar component="header" position="sticky" id="c-header">
      <Stack
        className="c-header--container"
        direction="row"
        height="100%"
        alignItems="center"
        px={{ xs: 2, lg: 3, "2xl": 6 }}
      >
        <div style={{ color: "black" }}>Logo</div>
        <div style={{ flex: 1 }}></div>
        <div style={{ color: "black" }}>Config user</div>
      </Stack>
    </AppBar>
  );
};
