import { ComponentsProps, ComponentsVariants, Theme } from "@mui/material";
import { ComponentsOverrides } from "@mui/material/styles/overrides";

export const buttonThemeConfigs: {
  defaultProps?: ComponentsProps["MuiButton"];
  styleOverrides?: ComponentsOverrides<Theme>["MuiButton"];
  variants?: ComponentsVariants<Theme>["MuiButton"];
} = {
  styleOverrides: {
    root: {
      textTransform: "none",
    },
  },
};
