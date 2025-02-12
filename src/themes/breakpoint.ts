import { BreakpointsOptions } from "@mui/material";

export const breakpointThemeConfigs: BreakpointsOptions = {
  values: {
    xs: 320,
    sm: 600,
    md: 900,
    lg: 1280,
    xl: 1536,
    "2xl": 1680,
    "3xl": 1920,
  },
};

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
    "3xl": true;
  }
}
