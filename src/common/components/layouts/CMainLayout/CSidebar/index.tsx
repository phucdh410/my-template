import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";

import logoSrc from "@/assets/images/logo.png";
import {
  HEADER__HEIGHT,
  SIDEBAR__BORDER_COLOR,
  SIDEBAR__COLLAPSE_WIDTH,
  SIDEBAR__EXPAND_WIDTH,
} from "@/constants/variables";
import { useSidebar } from "@/store/sidebar";

import { CNavigations } from "./CNavigations";
import { CNavigationsCollapse } from "./CNavigationsCollapse";

const StyledToggleButton = styled(IconButton)(({ theme }) => ({
  fontSize: "1.25rem",
  background: "white",
  zIndex: theme.zIndex.appBar + 1,
  padding: "2px",
  border: "1px solid black",
  borderColor: SIDEBAR__BORDER_COLOR,
  right: 0,
  top: `calc(${HEADER__HEIGHT}px / 2)`,
  position: "absolute",
  transform: "translate(50%,-50%)",
  color: "#637381",
  "&:hover": {
    background: "white",
  },
}));

export const CSidebar = () => {
  //#region Data
  const { open, toggleSidebar } = useSidebar();
  //#endregion

  //#region Render
  return (
    <Stack
      flexShrink={0}
      position="relative"
      borderRight="1px solid black"
      borderColor={SIDEBAR__BORDER_COLOR}
      width={open ? SIDEBAR__EXPAND_WIDTH : SIDEBAR__COLLAPSE_WIDTH}
      sx={{ transition: "all 200ms 50ms ease-out" }}
    >
      <StyledToggleButton onClick={toggleSidebar}>
        {open ? (
          <ChevronLeft fontSize="inherit" />
        ) : (
          <ChevronRight fontSize="inherit" />
        )}
      </StyledToggleButton>
      <Stack
        height={HEADER__HEIGHT}
        flexShrink={0}
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={logoSrc}
          alt="logo"
          style={{ maxWidth: open ? "70px" : "60px" }}
        />
      </Stack>
      {open ? <CNavigations /> : <CNavigationsCollapse />}
    </Stack>
  );
  //#endregion
};
