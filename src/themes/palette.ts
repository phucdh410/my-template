import { PaletteOptions } from "@mui/material";

export const paletteThemeConfigs: PaletteOptions = {
  primary: {
    main: "#06338BFF",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#670478FF",
    contrastText: "#ffffff",
  },
  custom: {
    main: "#333333",
    contrastText: "#ffffff",
  },
};

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    custom: true;
  }
}
