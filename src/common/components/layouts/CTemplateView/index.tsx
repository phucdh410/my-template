import { ReactNode } from "react";

import { useMediaQuery, useTheme } from "@mui/material";

interface ICTemplateViewProps {
  mobile: ReactNode;
  desktop: ReactNode;
}

export const CTemplateView = ({ mobile, desktop }: ICTemplateViewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return isMobile ? mobile : desktop;
};
