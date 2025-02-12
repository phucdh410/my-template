import { createTheme } from "@mui/material";

import { breakpointThemeConfigs } from "./breakpoint";
import { buttonThemeConfigs } from "./button";
import { paletteThemeConfigs } from "./palette";
import { typographyThemeConfigs } from "./typography";

// const theme = allThemes.reduce(
//   (prevTheme, nextTheme) => (prevTheme = createTheme(nextTheme)),
//   createTheme({ cssVariables: true })
// );

const theme = createTheme({
  typography: typographyThemeConfigs,
  breakpoints: breakpointThemeConfigs,
  palette: paletteThemeConfigs,
  components: {
    MuiButton: buttonThemeConfigs,
  },
});

export { theme };
