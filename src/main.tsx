import { createRoot } from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

import "dayjs/locale/vi";

import App from "./App.tsx";
import { theme } from "./themes";

import "./styles/index.scss";

dayjs.extend(updateLocale);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.updateLocale("vi", {
  weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  monthsShort: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
});

createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </LocalizationProvider>
);
