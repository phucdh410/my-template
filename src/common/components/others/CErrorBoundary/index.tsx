import { Stack } from "@mui/material";

import imgSrc from "../../../assets/development.jpg";

export const CDevelopmentView = () => {
  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      <Stack maxWidth={600}>
        <img src={imgSrc} alt="" />
      </Stack>
    </Stack>
  );
};
