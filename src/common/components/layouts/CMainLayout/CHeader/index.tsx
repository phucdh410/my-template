import { useEffect, useState } from "react";

import { AppBar, Stack } from "@mui/material";
import classNames from "classnames";

import "./styles.scss";

export const CHeader = () => {
  //#region Data
  const [outTop, setOutTop] = useState(false);
  //#endregion

  useEffect(() => {
    const mainEl = document.getElementById("layout-container");
    if (!mainEl) return;

    const handleScroll = () => {
      const { scrollTop } = mainEl;
      if (scrollTop !== 0) setOutTop(true);
      else setOutTop(false);
    };

    mainEl.addEventListener("scroll", handleScroll);

    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  //#region Render
  return (
    <AppBar
      component="header"
      position="sticky"
      id="c-header"
      className={classNames(outTop && "scroll-out-top")}
    >
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
  //#endregion
};
