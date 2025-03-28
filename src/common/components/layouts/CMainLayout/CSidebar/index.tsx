import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";

import { SIDEBAR_WIDTH } from "@/constants/enums";
import { useSidebar } from "@/store/sidebar";

import { CNavigations } from "./CNavigations";

const BORDER_COLOR = "rgba(145, 158, 171, 0.12)";

const StyledToggleButton = styled(IconButton)(() => ({
  fontSize: "1.25rem",
  background: "white",
  zIndex: 1,
  padding: "2px",
  border: "1px solid black",
  borderColor: BORDER_COLOR,
  right: 0,
  top: "3rem",
  position: "absolute",
  transform: "translateX(50%)",
  color: "#637381",
  "&:hover": {
    background: "white",
  },
}));

export const CSidebar = () => {
  //#region Data
  const { open, toggleSidebar } = useSidebar();
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack
      flexShrink={0}
      position="relative"
      borderRight="1px solid black"
      borderColor={BORDER_COLOR}
      width={open ? SIDEBAR_WIDTH.EXPAND : SIDEBAR_WIDTH.COLLAPSE}
      sx={{ transition: "all 200ms 50ms ease-out" }}
    >
      <StyledToggleButton onClick={toggleSidebar}>
        {open ? (
          <ChevronLeft fontSize="inherit" />
        ) : (
          <ChevronRight fontSize="inherit" />
        )}
      </StyledToggleButton>
      <Stack height={80}>Logo</Stack>
      <CNavigations />
    </Stack>
  );
  //#endregion
};
