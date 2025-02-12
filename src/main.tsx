import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import { theme } from "./themes";

import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
