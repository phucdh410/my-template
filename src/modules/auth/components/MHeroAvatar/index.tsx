import { Stack } from "@mui/material";

import heroImgSrc from "../../assets/hero-image.png";

import "./styles.scss";

export const MHeroAvatar = () => {
  return (
    <Stack
      className="hero-image--container"
      position="absolute"
      right={0}
      bottom="14%"
      maxWidth={600}
      zIndex={2}
    >
      <img src={heroImgSrc} />
    </Stack>
  );
};
